import React from 'react';
import { useEffect } from 'react';
import { fetchProducts } from '../../lib/api';
import { setProducts } from '../../store/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';

export const CartItems = () => {
  const dispatch = useDispatch<AppDispatch>();
  // get all goods from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // get all products for addition information (for future)
  // const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    fetchProducts().then((data) => dispatch(setProducts(data)));
  }, [dispatch]);

  // total price
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="flex flex-col justify-center align-middle p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${(item.price || 0) * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
