import fetch from 'node-fetch';
import fs from 'fs';

const products = JSON.parse(fs.readFileSync('src/const/productsToDB.json', 'utf-8'));

async function seedProducts() {
  try {
    const response = await fetch('http://localhost:5000/products/bulk-insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products),
    });

    const data = await response.json();
    console.log('✅ Done:', data);
  } catch (err) {
    console.error('❌ Error seeding products:', err);
  }
}

seedProducts();