type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url?: string;
  description?: string;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:5000/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const addProductToDatabase = async (newProduct: Omit<Product, 'id'>) => {
  const response = await fetch('http://localhost:5000/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });
  return await response.json();
};

export const updateProduct: (id: number, updatedData: Product) => Promise<Product> = async (
  id: number,
  updatedData: Product
) => {
  const response = await fetch(`http://localhost:5000/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

export const deleteProductFromDatabase: (id: number) => Promise<Product> = async (id: number) => {
  const response = await fetch(`http://localhost:5000/products/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await fetch(
    `http://localhost:5000/products/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  return response.json();
};
