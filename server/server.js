import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false }, // Required for Aiven
});

// // Fetch all products
// app.get('/products', async (req, res) => {
//   const { rows } = await pool.query('SELECT * FROM products');
//   res.json(rows);
// });

// // Create a new product
// app.post('/products', async (req, res) => {
//   const { name, description, price, category, image_url } = req.body;
//   await pool.query(
//     'INSERT INTO products (name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5)',
//     [name, description, price, category, image_url]
//   );
//   res.json({ message: 'Product added!' });
// });

// // Update a product
// app.put('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, category } = req.body;

//   await pool.query(
//     'UPDATE products SET name = $1, description = $2, price = $3, category = $4 WHERE id = $5',
//     [name, description, price, category, id]
//   );
//   res.json({ message: 'Product updated!' });
// });

// // Delete a product
// app.delete('/products/:id', async (req, res) => {
//   const { id } = req.params;

//   await pool.query('DELETE FROM products WHERE id = $1', [id]);
//   res.json({ message: 'Product deleted!' });
// });

// Fetch all products
app.get('/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create a new product
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

// Delete a product
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

app.listen(5000, () => console.log('Server running on port 5000'));
