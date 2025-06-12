import type { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import type { Product } from '@/store/slices/productsSlice';
import { addFavorite, removeFavorite } from '@/store/slices/favoriteSlice';

export const FavoriteItems = () => {
  const favoriteItems = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();

  const handleToggleFavorite = (item: Product) => {
    if (favoriteItems.some((fav) => fav.id === item.id)) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center sm:text-left">Your Favorite Items</h2>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You don't have any favorites yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold line-clamp-1 flex-1 pr-2">{item.name}</h3>
                <Button
                  // variant="ghost"
                  size="sm"
                  onClick={() => handleToggleFavorite(item)}
                  className="p-1 sm:p-2 h-9 w-9 sm:h-9 bg-transparent shadow-none transition-transform duration-300 hover:scale-130 hover:bg-transparent"
                >
                  <Heart
                    className="w-5 h-5"
                    fill={favoriteItems.some((fav) => fav.id === item.id) ? 'red' : 'none'}
                    stroke="red"
                    strokeWidth={1.5}
                  />
                </Button>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                {item.description}
              </p>

              <div className="relative  mb-3 overflow-hidden rounded flex justify-center items-center">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={item.image_url}
                  alt={item.name}
                  loading="lazy"
                />
              </div>

              <div className="mt-auto">
                <p className="text-gray-800 font-medium text-center text-lg">{item.price} USD</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
