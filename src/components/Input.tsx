import React, { SyntheticEvent } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  onChangeEvent?: (e: SyntheticEvent) => void;
  className?: string;
  name?: string;
  value: string | number;
  min?: number | string;
  max?: number | string;
}
export default ({
  type,
  onChangeEvent,
  placeholder,
  name,
  className,
  value,
  min,
  max
}: InputProps) => (
  <>
    <input
      type={type}
      onChange={onChangeEvent}
      placeholder={placeholder}
      name={name}
      value={value}
      min={min}
      max={max}
      className={`w-full h-16 border-b border-b-2 shadow p-3 ${className}`}
    />
  </>
);
