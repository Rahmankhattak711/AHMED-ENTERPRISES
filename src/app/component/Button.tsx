import React from "react";

interface ButtonProps {
    onClick?: () => void;
    text: string;
    className?: string;
    type?: "button" | "submit" | "reset";
}
const Button = ({ onClick, text, className ,type}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={`${className} mt-4 mb-4 rounded-sm py-2 px-4 bg-gray-400 text-white`}>
      {text}
    </button>
  );
};

export default Button;
