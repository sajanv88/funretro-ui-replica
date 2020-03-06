import React, { SyntheticEvent } from "react";
interface CheckboxProps {
  name: string;
  isChecked: boolean;
  value: string;
  onChange: (e: SyntheticEvent) => void;
}
export default ({ name, isChecked, value, onChange }: CheckboxProps) => (
  <>
    <input
      type="checkbox"
      name={name}
      value={value}
      checked={isChecked}
      onChange={onChange}
      id={name}
    />
    <label htmlFor="name">{name}</label>
  </>
);
