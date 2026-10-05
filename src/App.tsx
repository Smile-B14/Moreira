
import React, { useState, useRef, useCallback } from 'react';
import type { Brainrot } from './types';
import Header from './components/Header';
import MainView from './views/MainView';
import CartView from './views/CartView';
import { MAX_CART_ITEMS } from './constants';
import StyledButton from './components/StyledButton';
import { content } from './translations';


// --- START: In-file component definitions ---

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface GoToCartToastProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCart: () => void;
  language: 'en' | 'ka';
}

const GoToCartToast: React.FC<GoToCartToastProps> = ({ isOpen, onClose, onGoToCart, language }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
      role="alert"
      aria-live="assertive"
    >
      <div className={`
        flex items-center justify-between gap-4
        bg-gray-900/80 backdrop-blur-md
        border-2 border-purple-500 rounded-lg shadow-2xl shadow-purple-500/30
        p-4 transition-all duration-300 ease-in-out
        ${isOpen ? 'animate-fadeIn' : 'opacity-0'}
      `}>
        <p className="font-semibold text-white">{content[language].toastItemAdded}</p>
        <div className="flex items-center gap-2">
          <StyledButton onClick={onGoToCart} className="py-2 px-4 text-sm">
            {content[language].toastGoToCart}
          </StyledButton>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- END: In-file component definitions ---


const App: React.FC = () => {
  const [view, setView] = useState<'main' | 'cart'>('main');
  const [cartItems, setCartItems] = useState<Brainrot[]>([]);
  // FIX: Corrected the type for the language state to include both 'en' and 'ka'.
  const [language, setLanguage] = useState<'en' | 'ka'>('ka');
  const [showCartToast, setShowCartToast] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  const addToCart = useCallback((brainrot: Brainrot) => {
    // Prevent duplicates and enforce cart limit
    if (cartItems.length < MAX_CART_ITEMS && !cartItems.find(item => item.name === brainrot.name)) {
      setCartItems(prevItems => [...prevItems, brainrot]);
      setShowCartToast(true);
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = window.setTimeout(() => {
        setShowCartToast(false);
      }, 7000); // Auto-dismiss after 7 seconds
    }
  }, [cartItems]);

  const removeFromCart = useCallback((brainrotToRemove: Brainrot) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== brainrotToRemove.name));
  }, []);
  
  const handleCloseToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setShowCartToast(false);
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <div className="bg-[#0d0d0d] text-gray-200 font-inter min-h-screen relative overflow-x-hidden">
      <div className="static-bg-overlay"></div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>

      <Header 
        cartCount={cartItems.length} 
        onCartClick={() => setView('cart')} 
        onHomeClick={() => setView('main')}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div key={view} className="animation-fade-in-up">
          {view === 'main' ? (
            <MainView 
              cartItems={cartItems} 
              onAddToCart={addToCart} 
              onGoToCart={() => setView('cart')}
              language={language}
            />
          ) : (
            <CartView 
              cartItems={cartItems} 
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              language={language}
            />
          )}
        </div>
      </main>

      <GoToCartToast
        isOpen={showCartToast}
        onClose={handleCloseToast}
        onGoToCart={() => {
          setView('cart');
          handleCloseToast();
        }}
        language={language}
      />
    </div>
  );
};

export default App;
