import type { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { QuantityCounter } from './shared';
import { useEffect } from 'react';
import { fetchAllProducts } from '@/store/slices/productsSlice';

export const ShowProduct = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === productId)
  );
  // fetch all products if manually added address link like /product/:id then show product
  const dispatch = useDispatch<AppDispatch>();
  const allProducts = useSelector((state: RootState) => state.products.allProducts);
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchAllProducts({}));
    }
  }, [dispatch, allProducts]);

  const product = useSelector((state: RootState) =>
    state.products.allProducts.find((p) => p.id === productId)
  );

  if (!product) return <div className="p-6">Product not found</div>;
  return (
    product && (
      <div className="max-w-4xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
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
    )
  );
};
