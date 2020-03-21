import React, { SyntheticEvent } from "react";
interface CheckboxProps {
  name: string;
  isChecked: boolean;
  value?: string;
  onChange: (e: SyntheticEvent) => void;
}
export default ({ name, isChecked, value, onChange }: CheckboxProps) => (
  <>
    <label className="flex items-center truncate ml-2 mr-2">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={onChange}
        id={name}
      />
      <span className="block pl-1 truncate">{name}</span>
    </label>
  </>
);
