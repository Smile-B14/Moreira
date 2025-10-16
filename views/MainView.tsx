import React, { useState } from 'react';
import { BRAINROT_DATA, MAX_CART_ITEMS } from '../constants';
import type { Brainrot } from '../types';
import BrainrotCard from '../components/BrainrotCard';
import StyledButton from '../components/StyledButton';
import { content } from '../translations';

interface MainViewProps {
    cartItems: Brainrot[];
    onAddToCart: (brainrot: Brainrot) => void;
    onGoToCart: () => void;
    language: 'en' | 'ka';
}

const MainView: React.FC<MainViewProps> = ({ cartItems, onAddToCart, onGoToCart, language }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const isCartFull = cartItems.length >= MAX_CART_ITEMS;

  const filteredBrainrots = BRAINROT_DATA.filter(brainrot =>
    brainrot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20">
        <div className="max-w-4xl">
          <h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-chakra font-bold uppercase tracking-widest glitch animation-fade-in-up"
            data-text={content[language].heroTitle}
            style={{ animationDelay: '100ms' }}
          >
            {content[language].heroTitle}
          </h1>
          <p 
            className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto animation-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            {content[language].heroDescription}
          </p>
          <div 
            className="mt-10 animation-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <StyledButton onClick={cartItems.length > 0 ? onGoToCart : () => document.getElementById('selection')?.scrollIntoView({ behavior: 'smooth' })}>
              {cartItems.length > 0 ? content[language].goToCartButton : content[language].getBrainrotsButton}
            </StyledButton>
          </div>
        </div>
      </section>

      {/* The Selection Grid */}
      <section className="py-20" id="selection">
         <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-chakra font-bold text-center uppercase mb-4 tracking-wider text-shadow">
                {content[language].selectionTitle}
            </h2>
            <div className="max-w-4xl mx-auto mb-10 p-4 border-2 border-dashed border-purple-500 bg-purple-900/20 rounded-lg text-center">
              <p className="text-purple-300 font-semibold text-base sm:text-lg">
                <span className="font-bold text-white uppercase">{content[language].proTipLabel}</span> {content[language].proTipText}
              </p>
            </div>
            <div className="max-w-md mx-auto my-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={content[language].searchPlaceholder}
                aria-label={content[language].searchPlaceholder}
                className="w-full bg-gray-900/50 text-white placeholder-gray-500 border-2 border-purple-500/30 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-mono"
              />
               {isCartFull && (
                <p className="text-yellow-400 text-sm font-semibold mt-3">
                  {content[language].cartLimitReached}
                </p>
              )}
            </div>
         </div>
        <div className="max-w-7xl mx-auto">
          {filteredBrainrots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredBrainrots.map((brainrot, index) => (
                  <div 
                    key={brainrot.name} 
                    className="animation-fade-in-up"
                    style={{ animationDelay: `${100 + index * 50}ms` }}
                  >
                    <BrainrotCard 
                        brainrot={brainrot} 
                        onAddToCart={() => onAddToCart(brainrot)}
                        isInCart={!!cartItems.find(item => item.name === brainrot.name)}
                        language={language}
                        isCartFull={isCartFull}
                    />
                  </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-lg">{content[language].searchNotFound}</p>
          )}
        </div>
      </section>
      
        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-sm text-gray-600 max-w-3xl mx-auto">
            {content[language].footerText}
          </p>
        </footer>
    </>
  );
};

export default MainView;