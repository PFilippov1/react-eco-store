import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllProducts,
  setSortParams,
  type FetchProductsParams,
} from '@/store/slices/productsSlice';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { AppDispatch, RootState } from '@/store/store';
import { MoveDown, MoveUp } from 'lucide-react';
import { cn } from '@/lib';

export const SortBlock = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { category, sortBy, order } = useSelector((state: RootState) => state.products);

  const categories = ['all', 'fruit', 'berry', 'vegetable'];

  const handleSort = (sort: string, ord: string) => {
    dispatch(setSortParams({ sortBy: sort, order: ord }));
    const params: FetchProductsParams = { sortBy: sort, order: ord };
    if (category !== 'all') params.category = category;
    dispatch(fetchAllProducts(params));
  };

  const handleCategoryChange = (value: string) => {
    dispatch(setSortParams({ category: value }));
    const params: FetchProductsParams = {};
    if (sortBy && order) {
      params.sortBy = sortBy;
      params.order = order;
    }
    if (value !== 'all') params.category = value;
    dispatch(fetchAllProducts(params));
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex flex-col min-w-[180px] flex-1 sm:flex-initial">
        {/* Categories select*/}
        <div className="flex flex-col">
          <Label className="mb-1">Category</Label>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger aria-label="Select category" className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sorting */}

      <div className="flex flex-wrap gap-2 items-end">
        <Button
          variant="outline"
          onClick={() => handleSort('price', 'asc')}
          className={cn(
            'w-8 h-8 p-0 relative group',
            'hover:bg-transparent hover:text-current hover:border-gray-100'
          )}
        >
          <MoveUp className="w-4 h-4 transition-transform duration-100 group-hover:translate-y-[-3px] absolute" />
        </Button>
        Price:
        <Button
          variant="outline"
          onClick={() => handleSort('price', 'desc')}
          className={cn(
            'w-8 h-8 p-0  relative group',
            'hover:bg-transparent hover:text-current hover:border-gray-100'
          )}
        >
          <MoveDown className="w-4 h-4 transition-transform duration-100 group-hover:translate-y-[3px] absolute" />
        </Button>
      </div>
    </div>
  );
};
