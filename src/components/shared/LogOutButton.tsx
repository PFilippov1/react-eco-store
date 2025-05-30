import { logout } from '@/store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  return (
    <button
      onClick={() => dispatch(logout())}
      className="text-red-500 text-xs hover:underline ml-4"
    >
      Logout
    </button>
  );
};
