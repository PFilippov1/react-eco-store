import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '../../lib';
import { Search as SearchIcon, SearchX } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, searchProductsServer } from '../../store/slices/productsSlice';
import debounce from 'lodash.debounce';
import type { AppDispatch } from '@/store/store';

export const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [localQuery, setLocalQuery] = useState('');

  //create debounce function and clear debounce after unmount
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
      dispatch(searchProductsServer(query));
    }, 500),
    [dispatch]
  );
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleInputClear = () => {
    setLocalQuery('');
    debouncedSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-row bg-gray-50 items-center rounded-md overflow-hidden group">
      <div
        onClick={() => inputRef.current?.focus()}
        className="w-10 h-10 flex items-center justify-center cursor-text group-hover:text-gray-600 group-focus-within:text-gray-600"
      >
        {localQuery ? (
          <SearchX
            className="text-gray-400 transition-colors duration-200 cursor-pointer"
            onClick={handleInputClear}
          />
        ) : (
          <SearchIcon className="text-gray-400 transition-colors duration-200" />
        )}
      </div>
      <input
        ref={inputRef}
        value={localQuery}
        onChange={handleInputChange}
        className="w-auto h-full rounded-none border-0 focus:ring-gray-500 block p-2.5 group-hover:ring-gray-500 group-focus:ring-gray-500"
        placeholder="Search products..."
      />
      <button
        className={cn(
          'bg-green-500 h-full w-4/12 text-white flex items-center rounded-none justify-center'
        )}
      >
        Search
      </button>
    </div>
  );
};
