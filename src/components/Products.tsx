import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import {
  fetchAllProducts,
  type FetchProductsParams,
  type Product,
} from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addFavorite } from '@/store/slices/favoriteSlice';
import { Heart } from 'lucide-react';
import { Dialog, DialogTrigger } from './ui/dialog';
import { AuthDialogContent, SortBlock } from './shared';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredProducts = useSelector((state: RootState) => state.products.filteredProducts);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favoriteItems = useSelector((state: RootState) => state.favorites.favorites);
  const user = useSelector((state: RootState) => state.auth.user);
  const status = useSelector((state: RootState) => state.products.status);

  const [pendingFavorite, setPendingFavorite] = useState<Product | null>(null);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const { category, sortBy, order } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params: FetchProductsParams = {};

    if (sortBy && order) {
      params.sortBy = sortBy;
      params.order = order;
    }

    if (category && category !== 'all') {
      params.category = category;
    }

    dispatch(fetchAllProducts(params));
  }, [dispatch, category, sortBy, order]);

  // When the user logged in — add to favorites deferred product
  useEffect(() => {
    if (user && pendingFavorite) {
      dispatch(addFavorite(pendingFavorite));
      setPendingFavorite(null);
      setOpenAuthDialog(false);
    }
  }, [user, pendingFavorite, dispatch]);

  if (status === 'loading') {
    return <div>Loading products...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading products</div>;
  }

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
    if (user) {
      dispatch(addFavorite(product));
    } else {
      setPendingFavorite(product);
      setOpenAuthDialog(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <SortBlock />

      <Dialog open={openAuthDialog} onOpenChange={setOpenAuthDialog}>
        <DialogTrigger asChild>
          <div style={{ display: 'none' }} />
        </DialogTrigger>
        <AuthDialogContent />
      </Dialog>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found matching your criteria
          </div>
        ) : (
          filteredProducts.map((product) => {
            const cartItem = cartItems.find((item) => item.id === product.id);
            const isProductFavorite = favoriteItems.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="border p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="flex-1">
                  <Link
                    to={`/product/${product.id}`}
                    state={{
                      backgroundLocation: {
                        pathname: location.pathname,
                        search: location.search,
                        hash: location.hash,
                      },
                    }}
                    className="cursor-pointer flex flex-col h-full "
                  >
                    <h3 className="text-base sm:text-lg font-semibold !mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 !mb-2">
                      {product.description}
                    </p>

                    <div className="relative mb-3 overflow-hidden rounded flex justify-center items-center">
                      <img
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                        src={product.image_url}
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col p-1">
                  <p className="text-gray-700 font-medium mb-3">{product.price} USD</p>
                  <div className="mt-auto flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm py-1 h-8 sm:h-9"
                    >
                      {cartItem ? `Add (${cartItem.quantity})` : 'Add'}
                    </Button>

                    <Button
                      onClick={() => handleAddToFavorite(product)}
                      // variant="ghost"
                      size="sm"
                      className="p-1 sm:p-2 h-9 w-9 sm:h-9 bg-transparent shadow-none transition-transform duration-300 hover:scale-130 hover:bg-transparent"
                    >
                      <Heart
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill={isProductFavorite ? 'red' : 'none'}
                        stroke={isProductFavorite ? 'red' : 'black'}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
