import { fetchProducts, searchProducts } from '@/lib/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  allProducts: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  allProducts: [],
  filteredProducts: [],
  searchQuery: '',
  status: 'idle',
  error: null,
};

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await fetchProducts();
  return response;
});

export const searchProductsServer = createAsyncThunk('products/search', async (query: string) => {
  if (!query.trim()) {
    const response = await fetchProducts();
    return response;
  }
  const response = await searchProducts(query);
  return response;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearSearch(state) {
      state.searchQuery = '';
      state.filteredProducts = state.allProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(searchProductsServer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProductsServer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredProducts = action.payload;
      })
      .addCase(searchProductsServer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search products';
      });
  },
});

export const { setSearchQuery, clearSearch } = productsSlice.actions;
export default productsSlice.reducer;
