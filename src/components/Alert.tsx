import React, { CSSProperties, MouseEvent } from "react";
import { CloseBtn } from "./Button";

export enum Status {
  DANGER = "bg-red-600",
  SUCCESS = "bg-green-600",
  WARNING = "bg-orange-600",
  INFO = "bg-blue-600"
}
interface AlertProps {
  children: string | React.ReactNode;
  status: Status.DANGER | Status.INFO | Status.SUCCESS | Status.WARNING;
  callbackHandler?: (e: MouseEvent) => void;
}

const AlertStyles: CSSProperties = {
  width: "90%",
  wordBreak: "break-all"
};

export default ({ children, status, callbackHandler }: AlertProps) => (
  <div className={`px-4 py-2 ${status}`}>
    <div className="flex">
      <div className="flex-1 pt-1 text-white text-xl" style={AlertStyles}>
        {children}
      </div>
      <div>
        <CloseBtn name="closebtn" onClickEvent={callbackHandler} />
      </div>
    </div>
  </div>
);
