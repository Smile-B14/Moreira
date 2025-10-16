import React, { useState, useEffect } from 'react';
import StyledButton from './StyledButton';
import { content } from '../translations';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  language: 'en' | 'ka';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onClose, language }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5); // Reset countdown when modal opens
      const timer = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  
  const renderModalText = () => {
    const text = content[language].modalText;
    if (language === 'ka') {
        const parts = text.split(/(იშვიათი|მაგარი)/g);
        return (
            <span>
              {parts.map((part, i) =>
                part === 'იშვიათი' || part === 'მაგარი' ? (
                  <strong key={i} className="font-bold text-purple-300">{part}</strong>
                ) : (
                  part
                )
              )}
            </span>
        );
    }
    if (language === 'en') {
        const parts = text.split(/(rare|op)/g);
        return (
            <span>
              {parts.map((part, i) =>
                part === 'rare' || part === 'op' ? (
                  <strong key={i} className="font-bold text-purple-300">{part}</strong>
                ) : (
                  part
                )
              )}
            </span>
        );
    }
    return text;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative bg-gray-900 border-2 border-purple-500 rounded-lg shadow-2xl shadow-purple-500/30 max-w-lg w-full m-4 p-6 text-center modal-animation">
        <h2 className="text-2xl font-chakra font-bold uppercase text-purple-400 mb-4">
          {content[language].modalTitle}
        </h2>
        <p className="text-gray-300 mb-6">
          {renderModalText()}
        </p>
        <StyledButton 
          onClick={onConfirm}
          disabled={countdown > 0}
          className="w-full"
        >
          {countdown > 0 ? (
            <>
              {content[language].modalButtonCountdown} (<span className="font-chakra tabular-nums">{countdown}</span>s)
            </>
          ) : (
            content[language].modalButton
          )}
        </StyledButton>
      </div>
    </div>
  );
};

export default ConfirmationModal;