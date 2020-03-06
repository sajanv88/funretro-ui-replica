import React, { SyntheticEvent } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  onChangeEvent?: (e: SyntheticEvent) => void;
  className?: string;
  name?: string;
  value: string | number;
}
export default ({
  type,
  onChangeEvent,
  placeholder,
  name,
  className,
  value
}: InputProps) => (
  <>
    <input
      type={type}
      onChange={onChangeEvent}
      placeholder={placeholder}
      name={name}
      value={value}
      className={`w-full h-16 border-b border-b-2 shadow p-3 ${className}`}
    />
  </>
);
