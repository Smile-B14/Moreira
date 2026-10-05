import React from 'react';

export const CartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.837A1.125 1.125 0 0018.102 6H5.25v-.75a.75.75 0 00-.75-.75H3.75M7.5 14.25c0-1.657.06-3.284 1.5-3.284h6.75c1.44 0 1.5 1.627 1.5 3.284M7.5 14.25L7.5 15h12.75" />
    </svg>
);