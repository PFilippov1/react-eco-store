import { cn } from '../lib';
import { ChevronDown, MapPin } from 'lucide-react';
import Group from '../assets/img/Group.svg';
import PhoneCall from '../assets/img/PhoneCall.svg';
import { HeaderTopActions, Navbar, SearchBar, UserMenu } from './shared';
import { useRouteMatch, useTooltip } from '@/hooks';

const Header = () => {
  const InDevTooltip = useTooltip({ content: 'In process development', delayDuration: 200 });

  return (
    <div className={cn('container p-2', 'flex flex-col justify-between gap-3')}>
      {/* first section */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row ">
          <MapPin className="w-4 h-4" />
          <span>Store Location: Lincoln- 344, Illinois, Chicago, USA</span>
        </div>

        <div className="flex flex-row justify-start items-center align-center text-sm ">
          <InDevTooltip>
            <div className="flex flex-row cursor-not-allowed">
              <span className="flex flex-row text-gray-500">
                Eng
                <ChevronDown className="w-4 h-4" />
              </span>
              <span className="flex flex-row text-gray-500">
                USD
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </InDevTooltip>
          <div className=" flex flex-row gap-2 items-center border-0 p-0 m-0">
            <UserMenu />
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="flex flex-row justify-between flex-wrap">
        <div className="flex flex-row gap-1 content-center items-center cursor-pointer">
          <div className="w-6 h-6">
            <Group />
          </div>
          <span className="text-3xl font-bold"> Ecobazar</span>
        </div>

        {useRouteMatch() && <SearchBar />}
        <HeaderTopActions />
      </div>

      {/* third section */}

      <div className="flex flex-row justify-between items-center">
        <Navbar />
        <div className="flex flex-row gap-2 items-center">
          <div className="w-6 h-6">
            <PhoneCall />
          </div>{' '}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 text-opacity-50">Customer Service</span>
            <span className="text-[16px] font-bold">(123)123-4567</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
