import React from 'react';
import { CartIcon } from './icons/CartIcon';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  language: 'en' | 'ka';
  setLanguage: (lang: 'en' | 'ka') => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onHomeClick, language, setLanguage }) => {
  return (
    <header className="sticky top-0 z-30 bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={onHomeClick} className="text-lg sm:text-xl font-chakra font-bold uppercase tracking-wider cursor-pointer">
            OP Moreira Method | OP მორეირა მეთოდი
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-bold font-chakra">
              <button 
                onClick={() => setLanguage('en')}
                className={`transition-colors ${language === 'en' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-gray-600">|</span>
              <button 
                onClick={() => setLanguage('ka')}
                className={`transition-colors ${language === 'ka' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
              >
                KA
              </button>
            </div>
            <button onClick={onCartClick} className="relative text-gray-300 hover:text-white transition-colors">
              <CartIcon className="w-8 h-8" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-purple-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;