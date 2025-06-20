import { useLocation } from 'react-router-dom';

export const useRouteMatch = () => {
  const location = useLocation();
  const path = '/';
  if (location.pathname === path) {
    return true;
  }
};
