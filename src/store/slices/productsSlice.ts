import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
}

interface ProductsState {
  products: Product[];
}

interface ProductsState {
  products: Product[];
  searchQuery: string;
  filteredProducts: Product[];
}

const initialState: ProductsState = {
  products: [],
  searchQuery: '',
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },

    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.filteredProducts = state.filteredProducts.filter((p) => p.id !== action.payload);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      if (!action.payload.trim()) {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter((product) =>
          product.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
  },
});

export const { setProducts, removeProduct, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
