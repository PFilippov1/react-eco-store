import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();
const serverless = require('serverless-http');
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false }, // Required for Aiven
});

// Search products
app.get('/products/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE LOWER(name) LIKE LOWER($1)', [
      `%${q}%`,
    ]);
    res.json(rows);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

// Fetch all products
app.get('/products', async (req, res) => {
  const { sortBy = 'id', order = 'asc', category } = req.query;

  // validate sort and order
  const validSortBy = ['id', 'price', 'name'];
  const validOrder = ['asc', 'desc'];

  const sortColumn = validSortBy.includes(sortBy) ? sortBy : 'id';
  const sortOrder = validOrder.includes(order) ? order : 'asc';

  const values = [];
  let query = 'SELECT * FROM products';

  if (category) {
    query += ' WHERE LOWER(category) = LOWER($1)';
    values.push(category);
  }

  query += ` ORDER BY ${sortColumn} ${sortOrder}`;

  try {
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sorted/filtered products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create a new product (future feature)
app.post('/products', async (req, res) => {
  const { name, description, price, category, image_url } = req.body;
  try {
    await pool.query(
      'INSERT INTO products (name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5)',
      [name, description, price, category, image_url]
    );
    res.status(201).json({ message: 'Product added!' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Update a product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category = $4 WHERE id = $5',
      [name, description, price, category, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated!' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product from DB
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted!' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Registration

app.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // User's existence
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Registration successful',
      token,
      username,
      email,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed due to server error' });
  }
});

// upload Products to DB
app.post('/products/bulk-insert', async (req, res) => {
  const products = req.body;

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: 'Invalid data format, expected an array' });
  }

  try {
    // Complete cleaning the table + reset of auto  increment `id`
    await pool.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE');

    const values = products.map(({ name, description, price, category, image_url }) => [
      name,
      description,
      price,
      category,
      image_url,
    ]);

    const query = `
      INSERT INTO products (name, description, price, category, image_url)
      VALUES ${values.map((_, i) => `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`).join(',')}
    `;

    await pool.query(query, values.flat());

    res.status(201).json({ message: 'Products reset and added successfully!' });
  } catch (error) {
    console.error('Error resetting and adding products:', error);
    res.status(500).json({ error: 'Failed to reset and add products' });
  }
});

module.exports.handler = serverless(app);
