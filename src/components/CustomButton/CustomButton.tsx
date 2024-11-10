interface CustomButtonProps {
    bgColor: string;
    textColor: string;
    label: string;
    onClick?: () => void; // Optional onClick handler
    type?: "button" | "submit"; // Default to "button", can be overridden by parent component
  }
  
  const CustomButton: React.FC<CustomButtonProps> = ({
    bgColor,
    textColor,
    label,
    onClick,
    type = "button", // default type is "button"
  }) => {
    return (
      <button
        type={type}
        className={`${bgColor} ${textColor} w-full py-1.5 px-3 rounded-md text-sm font-semibold shadow-sm focus:outline-none`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  
  export default CustomButton;
  