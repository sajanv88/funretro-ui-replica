import React, { SyntheticEvent, useState } from "react";
import Checkbox from "./CheckBox";
import { useAuth, Board } from "../context/context";
import { ws, toServer } from "./PublicBoard";

import Api from "../api/Profile";

const api = Api();
interface PublicBoardHeaderProps {
  onShareHandler: () => void;
  board: Board;
  router: any;
}

enum CheckBoxTypes {
  DISABLE_VOTES = "Disable Votes",
  HIDE_VOTE = "Hide Vote",
  SHOULD_HIDE_TASK = "Should Hide Task"
}

export default ({ onShareHandler, board, router }: PublicBoardHeaderProps) => {
  const [boardData, setBoardData] = useState<Board>(board);
  const auth = useAuth();
  const { user } = auth;
  const onChangeHandler = async function(e: SyntheticEvent) {
    const target = e.target as HTMLFormElement;
    if (target.name === CheckBoxTypes.DISABLE_VOTES) {
      board.disableVotes = !board.disableVotes;
    }
    if (target.name === CheckBoxTypes.HIDE_VOTE) {
      board.hideVoteCount = !board.hideVoteCount;
    }
    if (target.name === CheckBoxTypes.SHOULD_HIDE_TASK) {
      board.shouldHideTask = !board.shouldHideTask;
    }
    setBoardData({ ...boardData, ...board });
    try {
      await api.updateBoard(board.id, board);
      ws.send(toServer);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex justify-evenly">
      <h1 className="text-2xl flex-1 truncate pr-3">{board.name}</h1>
      {user && (
        <>
          <Checkbox
            name="Disable Votes"
            isChecked={board.disableVotes}
            onChange={onChangeHandler}
          />
          <Checkbox
            name="Hide Vote"
            isChecked={board.hideVoteCount}
            onChange={onChangeHandler}
          />
          <Checkbox
            name="Should Hide Task"
            isChecked={board.shouldHideTask}
            onChange={onChangeHandler}
          />
        </>
      )}

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
