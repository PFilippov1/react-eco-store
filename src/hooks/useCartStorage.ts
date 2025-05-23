import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { setCartFromStorage } from '../store/slices/cartSlice';
import { loadCartFromStorage } from '../store/localStorageHelpers';

export const useCartStorage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedItems = loadCartFromStorage();
    dispatch(setCartFromStorage(storedItems));
  }, [dispatch]);
};
