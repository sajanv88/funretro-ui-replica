import React from "react";
import { CreateBoardDto } from "./Board";

interface PublicBoardHeaderProps {
  onShareHandler: () => void;
  board: CreateBoardDto;
  router: any;
}

export default ({ onShareHandler, board, router }: PublicBoardHeaderProps) => {
  return (
    <div className="flex justify-evenly">
      <h1 className="text-2xl flex-1 truncate pr-3">{board.name}</h1>
      <span
        className="cursor-pointer py-2 px-2 bg-blue-700 hover:bg-blue-500 text-white"
        onClick={onShareHandler}
      >
        <em className="pr-2">
          <i className="fa fa-share" aria-hidden="true" />
        </em>
        Share
      </span>
      <span
        className="cursor-pointer py-2 px-2 bg-blue-700 hover:bg-blue-500 text-white ml-2"
        onClick={() => router.history.push("/profile")}
      >
        <em className="pr-2">
          <i className="fa fa-undo" aria-hidden="true" />
        </em>
        Go back
      </span>
    </div>
  );
};
