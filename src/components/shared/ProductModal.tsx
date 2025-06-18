import { useNavigate, useParams } from 'react-router-dom';
import { QuantityCounter } from './QuantityCounter';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';

export const ProductModal = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const product = useSelector((state: RootState) =>
    state.products.allProducts.find((p) => p.id === productId)
  );
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === productId)
  );

  const handleClose = () => navigate(-1);

  if (!product) return null;

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogDescription>
        Detailed information and options for the selected product.
      </DialogDescription>
      <DialogContent className="max-w-4xl w-full p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-auto object-contain max-h-[400px]"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold">{product.price} USD</p>
            {cartItem && <QuantityCounter item={cartItem} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
