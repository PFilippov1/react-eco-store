import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchAllProductsApi, fetchProducts, searchProducts } from 'api/api';

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
  category: string;
  sortBy: string | null;
  order: string | null;
}

const initialState: ProductsState = {
  allProducts: [],
  filteredProducts: [],
  searchQuery: '',
  status: 'idle',
  error: null,
  category: 'all',
  sortBy: null,
  order: null,
};

export type FetchProductsParams = {
  sortBy?: string;
  order?: string;
  category?: string;
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (params?: FetchProductsParams) => {
    const data = await fetchAllProductsApi(params);
    return data;
  }
);

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
    setSortParams(
      state,
      action: PayloadAction<{ category?: string; sortBy?: string; order?: string }>
    ) {
      if (action.payload.category !== undefined) state.category = action.payload.category;
      if (action.payload.sortBy !== undefined) state.sortBy = action.payload.sortBy;
      if (action.payload.order !== undefined) state.order = action.payload.order;
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

export const { setSearchQuery, clearSearch, setSortParams } = productsSlice.actions;
export default productsSlice.reducer;
