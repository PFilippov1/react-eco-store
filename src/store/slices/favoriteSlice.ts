import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './productsSlice';
import { saveFavoritesToStorage } from '../localStorageHelpers';

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
      saveFavoritesToStorage(state.favorites);
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((p) => p.id !== action.payload);
      saveFavoritesToStorage(state.favorites);
    },

    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.favorites = action.payload;
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
export const selectFavorites = (state: { favorites: FavoritesState }) => {
  return state.favorites.favorites;
};
