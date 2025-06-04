import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/authSlice';
import { setFavorites } from '@/store/slices/favoriteSlice';

export const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const favorites = localStorage.getItem('favorites');

    if (token && user && favorites) {
      try {
        dispatch(loginSuccess({ token, user: JSON.parse(user) }));
        dispatch(setFavorites(JSON.parse(favorites)));
        console.log('✅ User logged in from localStorage');
      } catch (e) {
        console.error('❌ Failed to parse user from localStorage' + e);
      }
    } else {
      if (!token) console.warn('⚠️ No token found in localStorage');
      if (!user) console.warn('⚠️ No user found in localStorage');
    }
  }, [dispatch]);
};
