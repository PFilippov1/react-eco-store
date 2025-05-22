import { Minus, Plus } from 'lucide-react';
import { decrementQuantity, incrementQuantity, type CartItem } from '../../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { cn } from '../../lib';

interface QuantityCounterProps {
  item: CartItem;
}

export const QuantityCounter = ({ item }: QuantityCounterProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <Minus
        className={cn(
          'w-4 h-4 transition-opacity',
          item.quantity === 1 && 'opacity-50 pointer-events-none'
        )}
        onClick={handleDecrement}
      />
      <span className="px-1">{item.quantity}</span>
      <Plus className="w-4 h-4" onClick={handleIncrement} />
    </div>
  );
};
