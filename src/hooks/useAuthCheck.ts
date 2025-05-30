import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/authSlice';

export const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        dispatch(loginSuccess({ token, user: JSON.parse(user) }));
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
