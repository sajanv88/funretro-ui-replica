import React, { SyntheticEvent, useState, MouseEvent } from "react";
import Api from "../api/Public";
import { TaskDto } from "./TaskAdd";
import { ws, toServer } from "./PublicBoard";
import { anonymousUser } from "../utils";
import { Board } from "../context/context";
import "./TaskView.css";

const api = Api();

interface TaskViewProps {
  onEditHandler?: (task: TaskDto) => void;
  onDeleteHandler?: (status: boolean) => void;
  onChange?: (e: SyntheticEvent) => void;
  boardTemplateId: number;
  signature: string;
  task: TaskDto;
  maxVoteLimit?: number;
  board: Board;
}

export default ({
  onEditHandler,
  onDeleteHandler,
  boardTemplateId,
  task,
  signature,
  maxVoteLimit = 5,
  board
}: TaskViewProps) => {
  const [options, setOptions] = useState({
    noOfVotes: task.noOfVotes,
    boardTemplateId: boardTemplateId,
    annonymousToken: anonymousUser()
  });

  const onDelete = async function(e: MouseEvent) {
    try {
      await api.deletePublicTask(task.id, signature);
      if (onDeleteHandler) onDeleteHandler(true);
    } catch (e) {
      if (onDeleteHandler) onDeleteHandler(false);
      console.error(e);
    }
  };

  const onEdit = function(e: MouseEvent) {
    if (onEditHandler) {
      task.isEditable = true;
      onEditHandler(task);
    }
  };

  const onVotesHandler = async function() {
    try {
      options.noOfVotes += 1;
      task.noOfVotes = options.noOfVotes;
      await api.updateFeedback(task.id, signature, task);
      setOptions({ ...options });
      ws.send(toServer);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-gray-800 py-2 px-2 border-b-2 border-black mt-1 last:mb-2">
      <div className="flex justify-between">
        <span
          className={`text-white flex-1 text-2xl block break-all pr-5 ${
            board.shouldHideTask ? "blur-text" : ""
          }`}
        >
          {task.description}
        </span>
        {task.annonymousToken === options.annonymousToken && (
          <span className="text-white cursor-pointer" onClick={onEdit}>
            <i className="fa fa-edit" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="flex justify-end items-center pt-2">
        {!board.hideVoteCount && (
          <span
            className={`text-white cursor-pointer ${
              options.noOfVotes === maxVoteLimit || board.disableVotes
                ? "pointer-events-none text-gray-600"
                : ""
            }`}
            onClick={onVotesHandler}
          >
            <i className="fa fa-thumbs-up" aria-hidden="true" />
            <em className="mr-2 pl-1">{options.noOfVotes}</em>
          </span>
        )}

        {task.annonymousToken === options.annonymousToken && (
          <span className="text-red-700 cursor-pointer" onClick={onDelete}>
            <i className="fa fa-trash" aria-hidden="true" />
          </span>
        )}
      </div>
    </div>
  );
};
