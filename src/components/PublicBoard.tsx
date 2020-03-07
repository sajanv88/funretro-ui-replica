import React, { useEffect, useState, MouseEvent } from "react";
import Api from "../api/Public";
import Task from "./Task";
import { BoardColumn } from "../context/context";
import { PrimaryBtn } from "./Button";
const api = Api();

const fetchPublicBoard = async function(signature: string, cb: any) {
  try {
    const res = await api.getPublicBoards(signature);
    cb(res);
  } catch (e) {
    throw e;
  }
};

interface PublicBoardProps {
  signature: string;
}
export default ({ signature }: PublicBoardProps) => {
  const [templates, setTemplates] = useState([]);
  const [Tasks, setTasks] = useState([]);
  const onResponse = function(data: any) {
    console.log(data, "data");
    const { board } = data;
    setTemplates(board.templates);
  };
  useEffect(() => {
    fetchPublicBoard(signature, onResponse);
  }, [signature]);

  const onAddButtonHandler = function(e: MouseEvent) {
    setTasks([...Tasks]);
  };
  return (
    <div className="flex flex-col md:flex-row flex-wrap -mx-2 overflow-hidden">
      {templates.map((item: BoardColumn) => (
        <div
          key={item.id}
          className="my-2 px-2 w-full md:overflow-hidden md:w-1/3 lg:w-1/2 xl:w-1/3"
        >
          <div className="flex flex-col">
            <div>
              <span className="text-2xl uppercase block text-center">
                {item.name}
              </span>
              <PrimaryBtn
                label="add"
                name="add"
                onClickEvent={onAddButtonHandler}
              />
            </div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};
