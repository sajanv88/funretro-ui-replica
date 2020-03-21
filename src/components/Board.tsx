import React, { MouseEvent } from "react";
import { formatDistance, subDays } from "date-fns";
import { copyLink } from "../utils";
import Card from "./Card";
import { BoardColumn } from "../context/context";

export enum CheckBoxEnum {
  DISABLE_VOTES = "disableVotes",
  SHOULD_HIDE_TASK = "shouldHideTask",
  HIDE_VOTE_COUNT = "hideVoteCount",
  NO_OF_VOTES = "votes",
  NAME = "name"
}

export interface BoardProps {
  name: string;
  id: number;
  salt: string;
  createdAt: string;
  templates: BoardColumn[];
  userId?: number;
  onDelete: (id: number) => void;
  onClone: (id: number) => void;
}

export interface CreateBoardDto {
  votes: number;
  hideVoteCount: boolean;
  shouldHideTask: boolean;
  disableVotes: boolean;
  name: string;
  columns: BoardColumn[];
}

export interface CreateBoard {
  name: string;
  columns: BoardColumn[];
}

export enum BOARD_EVENT {
  COPIED = "GLOABAL_ALERT"
}

const onShareClicked = async function(e: MouseEvent<HTMLSpanElement>) {
  e.stopPropagation();
  const span = e.currentTarget as HTMLSpanElement;
  const link = span.getAttribute("data-link") as string;
  try {
    await copyLink(link);
    window.dispatchEvent(new Event(BOARD_EVENT.COPIED));
  } catch (e) {
    throw e;
  }
};

export default ({
  name,
  id,
  salt,
  createdAt,
  onDelete,
  onClone
}: BoardProps) => (
  <Card title={name} shouldClickable>
    <div className="flex flex-col h-full">
      <span className="block mt-2 mb-2 text-gray-800">
        <span className="block text-center">
          <i className="fa fa-clock" aria-hidden="true" />
          <span className="pl-1">
            {formatDistance(
              subDays(new Date(createdAt), 0),
              new Date()
            ).toUpperCase()}
          </span>
        </span>
      </span>
      <div className="flex justify-around lg:justify-between items-center">
        <span
          className="inline-block mt-2 cursor-pointer text-gray-600 hover:text-gray-800"
          data-link={salt}
          onClick={onShareClicked}
        >
          <i className="fa fa-share-alt" aria-hidden="true"></i>
          <span className="pl-2">Share</span>
        </span>
        <span
          className="inline-block mt-2 cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            onClone(id);
          }}
        >
          <i className="fa fa-clone" aria-hidden="true"></i>
          <span className="pl-2">Clone</span>
        </span>
        <span
          className="inline-block mt-2 cursor-pointer text-red-600 hover:text-red-800"
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
          <span className="pl-2">Delete</span>
        </span>
      </div>
    </div>
  </Card>
);
