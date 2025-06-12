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
    <div
      className={cn(
        'flex flex-row items-center rounded-md overflow-hidden',
        'bg-gray-50 transition-colors duration-200',
        'focus-within:bg-green-50',
        'w-full max-w-md md:max-w-lg lg:max-w-xl',
        'border border-gray-200 hover:border-gray-300 focus-within:border-green-300'
      )}
    >
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          'w-10 h-10 flex items-center justify-center cursor-text',
          'text-gray-400 group-hover:text-gray-600 group-focus-within:text-gray-600',
          'transition-colors duration-200'
        )}
      >
        {localQuery ? (
          <SearchX
            className="w-5 h-5 cursor-pointer hover:text-gray-600"
            onClick={handleInputClear}
          />
        ) : (
          <SearchIcon className="w-5 h-5" />
        )}
      </div>

      <input
        ref={inputRef}
        value={localQuery}
        onChange={handleInputChange}
        className={cn(
          'w-full h-full bg-transparent border-0 focus:ring-0',
          'px-2 py-3 text-gray-800 placeholder-gray-400',
          'focus:outline-none focus:bg-transparent'
        )}
        placeholder="Search products..."
      />
    </div>
  );
};
