import React, { MouseEvent } from "react";
import ReactDOM from "react-dom";
import { PrimaryBtn, SecondaryBtn } from "./Button";

import "./Modal.css";

interface ModelProps {
  children: React.ReactNode | React.ReactNodeArray;
  title: string;
  onSave: (e: MouseEvent) => void;
  onCancel: (e: MouseEvent) => void;
  show: boolean;
  shouldDisableBtn: boolean;
}

const elem = document.getElementById("profile");

export default ({
  children,
  title,
  onSave,
  onCancel,
  show,
  shouldDisableBtn
}: ModelProps) =>
  ReactDOM.createPortal(
    <div
      className={`modal ${
        !show ? " opacity-0 pointer-events-none" : ""
      } fixed w-full h-full top-0 left-0 flex items-center justify-center`}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:w-6/12 lg:w-4/12 mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"></div>

        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{title}</p>
            <div className="modal-close cursor-pointer z-50" onClick={onCancel}>
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          {children}
          <div className="flex justify-end pt-2">
            <PrimaryBtn
              label="create"
              name="create"
              onClickEvent={onSave}
              isDisabled={shouldDisableBtn}
            />
            <SecondaryBtn
              label="cancel"
              name="cancel"
              onClickEvent={onCancel}
            />
          </div>
        </div>
      </div>
    </div>,
    elem || document.body
  );
