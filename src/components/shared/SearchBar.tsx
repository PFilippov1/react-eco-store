import React from 'react';
import { cn } from '../../lib';
import { Search as SearchIcon } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-row bg-gray-50 items-center rounded-md overflow-hidden group">
      <div
        onClick={() => inputRef.current?.focus()}
        className="w-10 h-10 flex items-center justify-center cursor-text group-hover:text-gray-600 group-focus-within:text-gray-600"
      >
        <SearchIcon className="text-gray-400 transition-colors duration-200" />
      </div>
      <input
        ref={inputRef}
        className="w-auto h-full rounded-none border-0 focus:ring-gray-500 block p-2.5 group-hover:ring-gray-500 group-focus:ring-gray-500"
        placeholder="Search"
      />

      <button
        className={cn(
          'bg-green-500 h-full w-4/12 text-white flex items-center rounded-none justify-center '
        )}
      >
        Search
      </button>
    </div>
  );
};
