import React from 'react';

interface StyledButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ children, className, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-block
        font-chakra font-bold uppercase tracking-widest
        text-white bg-purple-600 
        py-3 px-8 rounded-md
        border-2 border-transparent
        transition-all duration-300 ease-in-out
        hover:bg-transparent hover:text-purple-400 hover:border-purple-400
        hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]
        focus:outline-none focus:ring-4 focus:ring-purple-500/50
        transform hover:-translate-y-1
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        ${className || ''}
      `}
    >
      {children}
    </button>
  );
};

export default StyledButton;