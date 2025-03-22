import React from 'react';

interface CheckboxProps {
  id: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  labelPosition?: 'before' | 'after' | 'top' | 'bottom';
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  labelPosition = 'after',
  className = '',
}) => {
  

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const isVertical = labelPosition === 'top' || labelPosition === 'bottom';
  const containerStyles = `flex ${isVertical ? 'flex-col gap-1' : 'items-center gap-2'} ${className}`.trim();

  const checkbox = (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${disabledStyles}`}
    />
  );

  const labelElement = label ? (
    <label htmlFor={id} className={`text-sm font-medium text-gray-700 ${disabledStyles}`}>
      {label}
    </label>
  ) : null;

  return (
    <div className={containerStyles}>
      {labelPosition === 'before' && labelElement}
      {labelPosition === 'top' && labelElement}
      {checkbox}
      {labelPosition === 'after' && labelElement}
      {labelPosition === 'bottom' && labelElement}
    </div>
  );
};