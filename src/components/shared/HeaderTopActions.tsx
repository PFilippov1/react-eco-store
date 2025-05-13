import { Heart, ShoppingBasket } from 'lucide-react';
import React from 'react';

export const HeaderTopActions: React.FC = () => {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="cursor-pointer">
        <Heart className="w-8 h-8" />
      </div>
      <div className="relative cursor-pointer">
        <ShoppingBasket className="w-8 h-8" />{' '}
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full !text-white font-bold flex items-center justify-center text-[10px]">
          5
        </span>
      </div>
      <div className="flex flex-col">
        <span>Shopping cart:</span>
        <span>10$</span>
      </div>
    </div>
  );
};
