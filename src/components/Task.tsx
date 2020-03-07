import React, { MouseEvent, SyntheticEvent, useRef, useState } from "react";
import { SecondaryBtn } from "./Button";
import "./Task.css";

interface TaskProps {
  onAdd?: (e: MouseEvent) => void;
  onDelete?: (e: MouseEvent) => void;
  onChange?: (e: SyntheticEvent) => void;
  value?: string;
}

export default ({ onAdd, onDelete, onChange, value }: TaskProps) => {
  const textRef = useRef<any>();
  const textDataRef = useRef<any>();
  const [options, setOptions] = useState({
    value: "",
    isEditable: false,
    votes: 0
  });
  const onChangeHandler = function(e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    const { value } = target;
    textRef.current.style.height = "30px";
    textRef.current.style.height = `${target.scrollHeight}px`;
    options.value = value;
    setOptions({ ...options });
  };

  const onAddHandler = function(e: MouseEvent) {
    options.isEditable = true;
    setOptions({ ...options });
  };
  const onEditHandler = function(e: MouseEvent) {
    options.isEditable = false;
    setOptions({ ...options });
  };

  if (options.isEditable) {
    return (
      <div className="bg-green-400 py-2 px-2" ref={textDataRef}>
        <div className="flex justify-between">
          <span className="text-white flex-1 text-2xl block break-all pr-5">
            {options.value}
          </span>
          <span className="text-white cursor-pointer" onClick={onEditHandler}>
            <i className="fa fa-edit" aria-hidden="true" />
          </span>
        </div>
        <div className="flex justify-end items-center pt-2">
          <span className="text-white cursor-pointer">
            <i className="fa fa-thumbs-up" aria-hidden="true" />
            <em className="ml-1">{options.votes}</em>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="border-8 border-green-400 bg-white">
      <textarea
        ref={textRef}
        onChange={onChangeHandler}
        value={options.value}
        className="text-area w-full outline-none p-1 m-0"
      />
      <div className="flex items-center justify-between px-1 py-1">
        <div className="w-56">
          <SecondaryBtn label="add" name="add" onClickEvent={onAddHandler} />
        </div>
        <span className="text-red-600 cursor-pointer pr-2">
          <i className="fa fa-trash" aira-hidden="true" />
        </span>
      </div>
    </div>
  );
};
