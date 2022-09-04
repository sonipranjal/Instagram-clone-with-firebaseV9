import React from 'react';

const Button = ({ children, disabled }) => {
  return (
    <button
      disabled={disabled}
      className="w-full h-full text-center bg-[#0095F6]"
    >
      {children}
    </button>
  );
};

export default Button;
