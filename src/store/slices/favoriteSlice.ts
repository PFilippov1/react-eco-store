import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './productsSlice';

export interface FavoritesState {
  favorites: Product[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.favorites.some((p) => p.id === action.payload.id);
      state.favorites = exists
        ? state.favorites.filter((p) => p.id !== action.payload.id) //del
        : [...state.favorites, action.payload]; //add
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
export const selectFavorites = (state: { favorites: FavoritesState }) => {
  return state.favorites.favorites;
};
