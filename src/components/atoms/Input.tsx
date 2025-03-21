import React from 'react';

interface InputProps {
    id?: string; 
    type?: 'text' | 'email' | 'password'; 
    label?: string; 
    placeholder?: string;
    value?: string; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    error?: string; 
    disabled?: boolean;
    className?: string; 
}

export const Input: React.FC<InputProps> = ({
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    className = '',
    id = '',
}) => {
  // Base input classes
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200';

  const errorClasses = error ? 'border-red-500' : 'border-gray-300';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const combineClasses = `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`;

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        id={id} 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={combineClasses}
      />
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};