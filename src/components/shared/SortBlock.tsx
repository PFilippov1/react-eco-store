import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, setSortParams } from '@/store/slices/productsSlice';
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

type FetchProductsParams = {
  sortBy?: string;
  order?: string;
  category?: string;
};

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
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-end">
      {/* Categories */}
      <div className="flex flex-col">
        <Label>Category</Label>
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger aria-label="Select category" className="min-w-[180px] w-fit">
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

      {/* Sorting */}
      <div className="flex gap-2 items-end">
        <Button variant="outline" onClick={() => handleSort('price', 'asc')}>
          Price: Low to High
        </Button>
        <Button variant="outline" onClick={() => handleSort('price', 'desc')}>
          Price: High to Low
        </Button>
      </div>
    </div>
  );
};
