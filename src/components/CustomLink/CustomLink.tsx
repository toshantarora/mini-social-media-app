import React from "react";
import { Link } from "react-router-dom";

interface CustomLinkProps {
  to: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  label,
  className = "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", // Default styles
  onClick,
}) => {
  return (
    <Link to={to} className={className} onClick={onClick}>
      {label}
    </Link>
  );
};

export default CustomLink;
