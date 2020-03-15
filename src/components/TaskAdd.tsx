import React, { MouseEvent, SyntheticEvent, useState } from "react";
import Api from "../api/Public";
import { SecondaryBtn } from "./Button";
import "./Task.css";

const api = Api();

interface TaskProps {
  onCallBack?: (task: TaskDto) => void;
  onDeleteCallBack?: (task: TaskDto) => void;
  onChange?: (e: SyntheticEvent) => void;
  value?: string;
  boardTemplateId: number;
  signature: string;
  task: TaskDto;
}

export interface TaskDto {
  id: number;
  title?: string;
  description: string;
  noOfVotes: number;
  status?: string;
  boardTemplateId: number;
  isEditable?: boolean;
  isNewTask?: boolean;
}

export default ({
  boardTemplateId,
  signature,
  task,
  onDeleteCallBack,
  onCallBack
}: TaskProps) => {
  const [options, setOptions] = useState({
    description: task?.description || "",
    noOfVotes: task?.noOfVotes || 0,
    title: task?.title || "",
    boardTemplateId: task?.boardTemplateId || boardTemplateId
  });
  const onChangeHandler = function(e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    const { value } = target;
    target.style.height = "30px";
    target.style.height = `${target.scrollHeight}px`;
    options.description = value;
    if (task) {
      task.description = value;
    }
    setOptions({ ...options });
  };

  const onAddHandler = async function(e: MouseEvent) {
    const params = { ...options };
    let newTask = null;
    try {
      if (task?.isEditable) {
        const { result } = await api.updateFeedback(task.id, signature, params);
        newTask = result;
      } else {
        const { result } = await api.submitFeedback(signature, params);
        newTask = result;
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (onCallBack) onCallBack(newTask);
    }
  };

  const onDelete = async function(e: MouseEvent) {
    if (task.isNewTask) {
      if (onDeleteCallBack) onDeleteCallBack(task);
    } else {
      try {
        await api.deletePublicTask(task.id, signature);
        if (onCallBack) onCallBack(task);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="border-8 border-gray-800 bg-white">
      <textarea
        onChange={onChangeHandler}
        value={options.description}
        className="text-area w-full outline-none p-1 m-0"
      />
      <div className="flex items-center justify-between px-1 py-1">
        <div className="w-24">
          <SecondaryBtn
            label={task?.isEditable ? "update" : "save"}
            name={task?.isEditable ? "update" : "save"}
            onClickEvent={onAddHandler}
            isDisabled={!options.description}
          />
        </div>
        <span className="text-red-600 cursor-pointer pr-2" onClick={onDelete}>
          <i className="fa fa-trash" aira-hidden="true" />
        </span>
      </div>
    </div>
  );
};
