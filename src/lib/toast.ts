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
export const toastTopRightSuccess = () => {
  toast.success('Hey 👋!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
  });
};

export const toastTopRightError = () => {
  toast.error('Oops!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
  });
};
