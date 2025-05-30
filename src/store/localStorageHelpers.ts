import type { CartItem } from './slices/cartSlice';
import type { Product } from './slices/productsSlice';

const CART_KEY = 'cartItems';
const FAVORITES_KEY = 'favorites';

export const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const loadCartFromStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load cart from storage:', e);
    return [];
  }
};

export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('Failed to clear cart from storage:', error);
  }
};
// TODO: add to favorites
export const saveFavoritesToStorage = (items: Product[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
};

export const loadFavoritesFromStorage = (): Product[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load favorites from storage:', e);
    return [];
  }
};
