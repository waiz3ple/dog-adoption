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
    name?: string;
    className?: string;
}

export const Input: React.FC<InputProps> = React.memo(({
    id = '',
    type = 'text',
    label,
    placeholder,
    value,
    name,
    onChange,
    error,
    disabled = false,
    className = '',
}) => {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const errorClasses = error ? 'border-red-500' : 'border-gray-300';
  const combinedClasses = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="space-y-2 mb-6">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={combinedClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});