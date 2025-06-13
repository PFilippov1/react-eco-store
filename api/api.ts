type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url?: string;
  description?: string;
};

// const API_URL = "https://react-eco-store.netlify.app/api";
// const API_URL = "http://localhost:5000";
// const API_URL = import.meta.env.DEV
//   ? 'http://localhost:8888/api'
//   : 'https://react-eco-store.netlify.app/api';
const API_URL = import.meta.env.DEV
  ? 'http://localhost:5000'
  : 'https://react-eco-store.onrender.com';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const addProductToDatabase = async (newProduct: Omit<Product, 'id'>) => {
  const response = await fetch(`${API_URL}/products`, {
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
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

export const deleteProductFromDatabase: (id: number) => Promise<Product> = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await fetch(
    `${API_URL}/products/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  return response.json();
};

export const fetchAllProductsApi = async (
  params?: { sortBy?: string; order?: string; category?: string }
): Promise<Product[]> => {
  const queryParams = new URLSearchParams(params || {}).toString();
  const response = await fetch(`${API_URL}/products?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};
