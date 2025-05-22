import type { RootState } from '../store';

export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
