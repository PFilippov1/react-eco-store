import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setProducts, type Product } from '../store/slices/productsSlice';
import { fetchProducts } from '../lib/api';
import { addToCart } from '../store/slices/cartSlice';
import { addFavorite } from '@/store/slices/favoriteSlice';

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // TODO: implement favorite
  const favoriteItems = useSelector((state: RootState) => state.favorites.favorites);
  console.log(favoriteItems.map((item) => item.name));

  useEffect(() => {
    fetchProducts().then((data) => dispatch(setProducts(data)));
  }, [dispatch]);

  // add to cart
  const handleAddToCart = async (product: Product) => {
    dispatch(addToCart(product));
    // add to database
    // await addProductToDatabase(product);
  };
  // -------------------------------

  // const handleDelete = async (id: number) => {
  //   dispatch(removeProduct(id));
  //   // delete from database
  //   // await deleteProductFromDatabase(id);
  // };
  const handleAddToFavorite = async (product: Product) => {
    dispatch(addFavorite(product));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        return (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <img
              className="w-32 h-32 object-cover mx-auto"
              src={product.image_url}
              alt={product.name}
            />
            <p className="text-gray-700">{product.price} USD</p>
            <div className="flex flex-row gap-1 justify-between">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 text-white px-2 py-2 rounded-md mt-1"
              >
                {cartItem ? `Add (${cartItem.quantity})` : 'Add'}
              </button>
              {/* TODO: add to favorite */}
              <button
                onClick={() => handleAddToFavorite(product)}
                className="bg-gray-300 text-black px-2 py-2 rounded-md mt-1"
              >
                {cartItem ? `Favorite  (${cartItem.quantity})` : 'Favorite'}
              </button>
              {/* <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-2 py-2 rounded-md mt-1"
              >
                Delete
              </button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
