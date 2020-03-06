import React, { MouseEvent } from "react";
import { PrimaryBtn } from "./Button";

interface ToolBarProps {
  onCallBack?: (e: MouseEvent) => void;
}
const ToolBar = ({ onCallBack }: ToolBarProps) => {
  return (
    <div className="py-2 mb-1">
      <div className="flex justify-end">
        <div className="w-56">
          <PrimaryBtn
            label="Create a board"
            icon="fa fa-plus"
            onClickEvent={onCallBack}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ToolBar);
