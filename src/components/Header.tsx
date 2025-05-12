import React from 'react';
import { cn } from '../lib';
import { ChevronDown, MapPin } from 'lucide-react';
import Group from '../assets/img/Group.svg';
import PhoneCall from '../assets/img/PhoneCall.svg';
import SearchBar from './SearchBar';

const Header: React.FC = function () {
  return (
    <div className={cn('container', 'flex flex-col justify-between')}>
      {/* first section */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <MapPin />
          <span>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>
        </div>
        <div className="flex flex-row justify-start items-center">
          <span className="flex flex-row">
            Eng
            <ChevronDown />
          </span>
          <span className="flex flex-row">
            USD
            <ChevronDown />
          </span>
        </div>
      </div>

      {/* second section */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1 content-center items-center">
          <Group />
          <span className="text-3xl font-bold"> Ecobazar</span>
        </div>
        <SearchBar />

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-10 h-10">
              <PhoneCall />
            </div>{' '}
            <div className="flex flex-col">
              <span className="text-sm !text-gray-500 !text-opacity-50">Customer Service</span>
              <span className="text-xl font-bold">(123)123-4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* third section */}
      <div className="flex flex-row justify-between items-center">Third</div>
    </div>
  );
};

export default Header;
