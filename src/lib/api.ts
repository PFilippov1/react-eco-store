type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url?: string;
};

export const fetchProducts: () => Promise<Product[]> = async () => {
  const response = await fetch('http://localhost:5000/products');
  return response.json();
};

export const addProductToDatabase = async (newProduct: Product) => {
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
