import { useEffect, useState } from 'react';
import { fetchProducts } from '../lib/api';
import { setProducts } from '../store/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { selectTotalPrice } from '../store/selectors/selectTotalPrice';
import { ConfirmModal, QuantityCounter } from './shared';
import { clearCart, removeFromCart } from '../store/slices/cartSlice';
import { Trash2 } from 'lucide-react';
import { toastCartClearTopRightSuccess } from '../lib';
import 'react-toastify/dist/ReactToastify.css';

export const CartItems = () => {
  const dispatch = useDispatch<AppDispatch>();
  // get all goods from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts().then((data) => dispatch(setProducts(data)));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center align-middle p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex flex-row flex-wrap-reverse justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded-lg flex flex-col justify-between w-full h-full"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-auto pt-2 border-t">
                  <QuantityCounter item={item} />

                  <div className="text-right font-bold min-w-[80px]">
                    ${((item.price || 0) * item.quantity).toFixed(2)}
                  </div>
                  <Trash2
                    className="text-red-500 cursor-pointer w-4 h-4"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col font-bold text-lg">
            <span>Total:</span>
            <span className="pl-2">${Number(totalPrice).toFixed(2)}</span>

            <button
              onClick={() => setShowModal(true)}
              className="mt-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
            >
              Clean Cart
            </button>

            {showModal && (
              <ConfirmModal
                message="Are you sure you want to clear your cart?"
                onConfirm={() => {
                  dispatch(clearCart());
                  setShowModal(false);
                  toastCartClearTopRightSuccess();
                }}
                onCancel={() => setShowModal(false)}
              />
            )}
          </div>
          {/* // clear cart TODO */}
        </div>
      )}
    </div>
  );
};
