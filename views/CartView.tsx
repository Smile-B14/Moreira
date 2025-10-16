
import React, { useState, useEffect, useRef } from 'react';
import type { Brainrot } from '../types';
import { ROBLOX_PRIVATE_SERVER_LINK } from '../constants';
import StyledButton from '../components/StyledButton';
import { TrashIcon } from '../components/icons/TrashIcon';
import { content } from '../translations';
import ConfirmationModal from '../components/ConfirmationModal';

interface CartViewProps {
  cartItems: Brainrot[];
  onRemoveFromCart: (brainrot: Brainrot) => void;
  onClearCart: () => void;
  language: 'en' | 'ka';
}

const CartView: React.FC<CartViewProps> = ({ cartItems, onRemoveFromCart, onClearCart, language }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLines]);

  useEffect(() => {
    // This effect ensures that the cart is cleared only after the user
    // navigates away from the success screen, preventing a race condition
    // that made the redirect link unresponsive.
    return () => {
      if (isSuccess) {
        onClearCart();
      }
    };
  }, [isSuccess, onClearCart]);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsModalOpen(true);
  };

  const startProcessing = () => {
    setIsModalOpen(false);
    setIsProcessing(true);
    setIsSuccess(false);
    setConsoleLines([]);
    setProgress(0);
    
    const itemNames = cartItems.map(item => item.name).join(', ');
    const lines = content[language].getConsoleLines(itemNames, cartItems.length);

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setConsoleLines(prev => [...prev, lines[currentLine]]);
        setProgress(Math.round(((currentLine + 1) / lines.length) * 100));
        currentLine++;
      } else {
        clearInterval(interval);
        // onClearCart() was moved to a useEffect cleanup to prevent re-render issues.
        setIsSuccess(true);
      }
    }, 400);
  };

  if (isProcessing) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-10">
        <div className="text-left p-4 sm:p-6 bg-black rounded-lg border border-purple-500 max-w-2xl w-full font-mono text-sm text-green-400 shadow-2xl shadow-purple-500/20">
          <div className="flex items-center mb-4 pb-2 border-b border-gray-700">
            <div className="flex items-center">
                <span className="bg-red-500 rounded-full w-3 h-3 mr-2"></span>
                <span className="bg-yellow-500 rounded-full w-3 h-3 mr-2"></span>
                <span className="bg-green-500 rounded-full w-3 h-3"></span>
            </div>
            <p className="flex-grow text-center text-gray-500 text-xs sm:text-sm">{content[language].consoleWindowTitle}</p>
          </div>
          <div id="console-output" className="h-64 sm:h-72 overflow-y-auto pr-2 custom-scrollbar">
            {consoleLines.map((line, index) => (
              <p key={index} className="flex console-line-animation">
                <span className="text-gray-500 mr-2 shrink-0">&gt;</span>
                <span className="break-words">{line}</span>
              </p>
            ))}
            {!isSuccess && <div className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-2"></div>}
             <div ref={consoleEndRef} />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="w-full bg-gray-700 rounded-full h-2.5 border border-purple-800">
              <div 
                className="bg-purple-600 h-full rounded-full transition-all duration-300 ease-linear"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #4a044e, #8B5CF6, #10B981)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-anim 3s ease infinite',
                }}
              ></div>
            </div>
          </div>
          {isSuccess && (
            <div className="mt-4 text-center success-animation">
              <h2 className="text-lg sm:text-xl font-chakra uppercase font-bold text-green-400 mb-2">{content[language].transferSuccessTitle}</h2>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">
                {content[language].transferSuccessText}
              </p>
              <StyledButton onClick={() => window.open(ROBLOX_PRIVATE_SERVER_LINK, '_top')}>
                {content[language].joinServerButton}
              </StyledButton>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="py-16 min-h-[80vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-chakra font-bold uppercase mb-4 tracking-wider">
          {content[language].emptyCartTitle}
        </h1>
        <p className="text-gray-400 text-lg max-w-md">
          {content[language].emptyCartText}
        </p>
      </section>
    );
  }

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={startProcessing}
        onClose={() => setIsModalOpen(false)}
        language={language}
      />
      <section className="py-16 min-h-[80vh]">
          <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-chakra font-bold uppercase mb-8 tracking-wider text-center">{content[language].cartTitle}</h1>
              <div className="bg-gray-900/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-6 space-y-4">
                  {cartItems.map((item, index) => (
                      <div 
                        key={item.name} 
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-md border border-gray-700 animation-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                          <div className="flex items-center gap-4">
                              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain rounded bg-black" />
                              <div>
                                  <h3 className="text-lg font-chakra font-bold">{item.name}</h3>
                                  <p className={`text-sm font-bold ${item.rarityColor}`}>{item.rarity}</p>
                                  <p className="font-chakra text-base text-green-400 mt-1">0.00$</p>
                              </div>
                          </div>
                          <button 
                              onClick={() => onRemoveFromCart(item)} 
                              className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-500/10"
                              aria-label={`Remove ${item.name}`}
                          >
                              <TrashIcon className="w-6 h-6" />
                          </button>
                      </div>
                  ))}
              </div>
              <div className="mt-8 text-center">
                  <StyledButton onClick={handleCheckout} disabled={cartItems.length === 0}>
                      {cartItems.length === 1
                        ? content[language].getItemsNow_one
                        : content[language].getItemsNow_other.replace('{count}', cartItems.length.toString())}
                  </StyledButton>
              </div>
          </div>
      </section>
    </>
  );
};

export default CartView;