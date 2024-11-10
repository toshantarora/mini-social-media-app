import React from "react";

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextInputField: React.FC<TextInputProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  required = false,
  autoComplete,
  value,
  onChange,
  className = "",
}) => {
  // Default class names for the input element
  const defaultClasses = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          // Apply both default and custom classes
          className={`${defaultClasses} ${className}`}
        />
      </div>
    </div>
  );
};

export default TextInputField;
