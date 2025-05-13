import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
interface NavLinkType {
  name: string;
  path: string;
}

const navLinks: NavLinkType[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      <nav className="flex justify-between items-center w-full">
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>

        {/* Mobile Menu (opens by click) */}
        {isMenuOpen && (
          <ul className="md:hidden absolute top-16 left-0 right-0 bg-white p-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};
