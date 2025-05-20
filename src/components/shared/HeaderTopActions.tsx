import { Heart, ShoppingBasket } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store/store';

export const HeaderTopActions: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log(cartItems.length);
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="cursor-pointer">
        <Heart className="w-8 h-8" />
      </div>
      <Link className="relative cursor-pointer  text-black" to="/cart">
        <ShoppingBasket className="w-8 h-8" />{' '}
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full !text-white font-bold flex items-center justify-center text-[10px]">
          {cartItems.length}
        </span>
      </Link>
      <div className="flex flex-col">
        <span>Shopping cart:</span>
        <span>10$</span>
      </div>
    </div>
  );
};
