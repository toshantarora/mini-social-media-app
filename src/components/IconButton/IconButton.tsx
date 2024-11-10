import React from "react";

interface IconButtonProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;  // Optional onClick handler
}

const IconButton: React.FC<IconButtonProps> = ({ label, href, icon, className = "", onClick }) => {
  return (
    <a
      href={href}
      className={`flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent ${className}`}
      onClick={onClick}  // Attach the onClick handler here
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );
};

export default IconButton;
