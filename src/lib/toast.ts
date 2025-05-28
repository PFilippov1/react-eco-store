import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastCartClearTopRightSuccess = () => {
  toast.success('you cleared your cart 👋!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
  });
};
export const toastTopRightSuccess = (message: string) => {
  toast.success(` ✅ ${message}`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
  });
};

export const toastTopRightError = (message: string) => {
  toast.error(`Oops! ❌ ${message}`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
  });
};
