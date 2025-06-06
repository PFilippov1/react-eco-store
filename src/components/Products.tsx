import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setProducts, type Product } from '../store/slices/productsSlice';
import { fetchProducts } from '../lib/api';
import { addToCart } from '../store/slices/cartSlice';
import { addFavorite } from '@/store/slices/favoriteSlice';
import { Heart } from 'lucide-react';
import { Dialog, DialogTrigger } from './ui/dialog';
import { AuthDialogContent } from './shared';
import { Button } from './ui/button';

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredProducts = useSelector((state: RootState) => state.products.filteredProducts);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favoriteItems = useSelector((state: RootState) => state.favorites.favorites);
  const user = useSelector((state: RootState) => state.auth.user);

  const [pendingFavorite, setPendingFavorite] = useState<Product | null>(null);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);

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

  // When the user logged in — Add to favorites deferred product
  useEffect(() => {
    if (user && pendingFavorite) {
      dispatch(addFavorite(pendingFavorite));
      setPendingFavorite(null);
      setOpenAuthDialog(false);
    }
  }, [user, pendingFavorite, dispatch]);

  const handleAddToFavorite = async (product: Product) => {
    if (user) {
      dispatch(addFavorite(product));
    } else {
      setPendingFavorite(product);
      setOpenAuthDialog(true);
    }
  };

  return (
    <>
      {/* add to favorites btn it invokes Login dialogue execution */}
      <Dialog open={openAuthDialog} onOpenChange={setOpenAuthDialog}>
        <DialogTrigger asChild>
          <div style={{ display: 'none' }} />
        </DialogTrigger>
        <AuthDialogContent />
      </Dialog>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          const isProductFavorite = favoriteItems.some((item) => item.id === product.id);
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
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-500 text-white px-2 py-2 rounded-md mt-1"
                >
                  {cartItem ? `Add (${cartItem.quantity})` : 'Add'}
                </Button>
                {/* add to favorite */}
                <Button
                  onClick={() => handleAddToFavorite(product)}
                  className="bg-white! px-2 py-2 hover:scale-120 shadow-none"
                >
                  <Heart
                    className="hover:scale-120 w-5 h-5 "
                    fill={isProductFavorite ? 'red' : 'none'}
                    stroke={isProductFavorite ? 'red' : 'gray'}
                  />
                </Button>
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
    </>
  );
};
