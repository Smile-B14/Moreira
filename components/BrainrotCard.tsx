import React from 'react';
import type { Brainrot } from '../types';
import StyledButton from './StyledButton';
import { CheckIcon } from './icons/CheckIcon';
import { content } from '../translations';

interface BrainrotCardProps {
  brainrot: Brainrot;
  onAddToCart: () => void;
  isInCart: boolean;
  language: 'en' | 'ka';
  isCartFull: boolean;
}

const BrainrotCard: React.FC<BrainrotCardProps> = ({ brainrot, onAddToCart, isInCart, language, isCartFull }) => {
  const buttonText = () => {
    if (isInCart) return content[language].addedToCart;
    if (isCartFull) return content[language].cartLimitReached;
    return content[language].addToCart;
  };

  return (
    <div className={`
      group relative
      bg-gray-900/50 backdrop-blur-md
      border ${brainrot.borderColor} border-opacity-30
      rounded-lg p-6 text-center
      transition-all duration-300 ease-in-out
      flex flex-col
      hover:border-opacity-100 hover:shadow-2xl hover:scale-105
      hover:shadow-purple-500/20
    `}>
      <div className="flex-grow flex flex-col justify-start items-center">
        <div className="relative w-full aspect-video rounded-md overflow-hidden mb-4 border-2 border-transparent group-hover:border-purple-500 transition-colors duration-300 bg-black">
          <img 
            src={brainrot.imageUrl} 
            alt={brainrot.name} 
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
          {isInCart && (
            <div className="absolute inset-0 bg-green-500/50 flex items-center justify-center">
              <CheckIcon className="w-16 h-16 text-white" />
            </div>
          )}
        </div>
        <h3 className="text-xl font-chakra font-bold uppercase tracking-wider text-white mb-2">
          {brainrot.name}
        </h3>
        <p className={`font-bold text-sm mb-1 ${brainrot.rarityColor}`}>
          {brainrot.rarity}
        </p>
        <div className="flex justify-center items-baseline gap-2 mb-3">
          <p className="font-chakra text-lg text-red-500 line-through">
            {brainrot.price.toFixed(2)}$
          </p>
          <p className="font-chakra text-xl text-green-400">
            0.00$
          </p>
        </div>
      </div>
      <StyledButton 
        className="w-full mt-auto" 
        onClick={onAddToCart}
        disabled={isInCart || isCartFull}
      >
        {buttonText()}
      </StyledButton>
    </div>
  );
};

export default BrainrotCard;