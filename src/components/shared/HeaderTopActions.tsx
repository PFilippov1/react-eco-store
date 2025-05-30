import { Heart, ShoppingBasket } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { selectTotalPrice } from '../../store/selectors/selectTotalPrice';

export const HeaderTopActions = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productsQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = useSelector(selectTotalPrice);
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="cursor-pointer">
        <Heart className="w-6 h-8" />
      </div>
      <Link className="relative cursor-pointer  text-black" to="/cart">
        <ShoppingBasket className="w-8 h-8" />{' '}
        {productsQuantity > 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full !text-white font-bold flex items-center justify-center text-[10px]">
            {productsQuantity}
          </span>
        )}
      </Link>
      <div className="flex flex-col">
        <span>Shopping cart:</span>
        <span>${Number(totalPrice || 0).toFixed(2)}</span>
      </div>
    </div>
  );
};
