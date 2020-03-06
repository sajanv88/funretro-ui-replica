import React, { MouseEvent } from "react";
interface ButtonProps {
  label?: string;
  name?: string;
  onClickEvent?: (e: MouseEvent) => void;
  isDisabled?: boolean;
  icon?: string;
}
export const PrimaryBtn = ({
  label,
  onClickEvent,
  name,
  isDisabled,
  icon
}: ButtonProps) => (
  <button
    className={`bg-blue-800 h-12 w-full hover:bg-blue-700 text-white uppercase tracking-wider ${
      isDisabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    onClick={onClickEvent}
    name={name}
  >
    {label} {icon && <i className={icon} aria-hidden="true" />}
  </button>
);

export const SecondaryBtn = ({
  label,
  onClickEvent,
  name,
  isDisabled,
  icon
}: ButtonProps) => (
  <button
    className={`bg-orange-600 h-12 w-full hover:bg-orange-500 text-white uppercase tracking-wider px-3 ${
      isDisabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    onClick={onClickEvent}
    name={name}
  >
    {label} {icon && <i className={icon} aria-hidden="true" />}
  </button>
);

export const CloseBtn = ({ onClickEvent, name }: ButtonProps) => (
  <button
    className="text-white rounded-full border border-2 border-white px-3 py-1 hover:bg-white hover:text-black"
    onClick={onClickEvent}
    name={name}
  >
    X
  </button>
);
