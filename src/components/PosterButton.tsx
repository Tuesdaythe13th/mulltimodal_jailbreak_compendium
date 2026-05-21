import React from "react";

interface PosterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const PosterButton: React.FC<PosterButtonProps> = ({ 
  variant = "primary", 
  children, 
  className = "", 
  ...props 
}) => {
  const baseClasses = "px-[32px] py-[16px] text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ease-linear rounded-none";
  
  const variants = {
    primary: "bg-cobalt text-cream hover:bg-jet",
    secondary: "bg-jet text-cream hover:bg-cobalt", // Secondary variant custom specified to reverse behavior
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
