import { useLocation } from 'react-router-dom';

export const useRouteMatch = () => {
  const { pathname } = useLocation();
  const pathParams = ['/', '/products', '/category'];
  return pathParams.includes(pathname);
};
