import { Heart, ShoppingBasket } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { selectTotalPrice } from '../../store/selectors/selectTotalPrice';
import { cn } from '@/lib';

export const HeaderTopActions = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productsQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = useSelector(selectTotalPrice);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <Link to="/favorite" className="cursor-pointer">
        <Heart
          className={cn('w-6 h-8 transition-transform duration-200 ease-in-out hover:scale-120', {
            'fill-red-500 stroke-none': favorites.length > 0,
            'stroke-current': favorites.length === 0,
          })}
        />
      </Link>

      <Link to="/cart" className="relative cursor-pointer text-black flex items-center gap-2">
        <div className="relative">
          <ShoppingBasket className="w-8 h-8" />{' '}
          {productsQuantity > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full !text-white font-bold flex items-center justify-center text-[10px] text-center p-0">
              {productsQuantity}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span>Shopping cart:</span>
          <span>${Number(totalPrice || 0).toFixed(2)}</span>
        </div>
      </Link>
    </div>
  );
};
