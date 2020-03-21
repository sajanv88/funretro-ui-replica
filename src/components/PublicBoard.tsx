import React, { useEffect, useState } from "react";
import * as uuid from "uuid";
import Api from "../api/Public";
import TaskAdd, { TaskDto } from "./TaskAdd";
import TaskView from "./TaskView";
import PublicBoardHeader from "./PublicBoardHeader";
import { BoardColumn } from "../context/context";
import { PrimaryBtn } from "./Button";
import Loading from "./Loading";
import { copyLink, anonymousUser } from "../utils";
import Alert, { Status } from "./Alert";
import "./PublicBoard.css";

export let ws = new WebSocket("ws://localhost:3002");
export const toServer = JSON.stringify({ event: "refresh" });

const api = Api();

interface PublicBoardProps {
  signature: string;
  router: any;
}

const getBoards = async function(
  signature: string
): Promise<{ board: any; tasks: any }> {
  try {
    const res = await api.getPublicBoards(signature);
    const { board, tasks } = res;
    tasks.forEach((task: TaskDto) => {
      task.isEditable = false;
      task.isNewTask = false;
    });
    return { board, tasks };
  } catch (e) {
    throw e;
  }
};

export default ({ signature, router }: PublicBoardProps) => {
  const salt = window.decodeURIComponent(signature);
  const [board, setBoard] = useState<any>();
  const [showAlert, setAlert] = useState<boolean>(false);
  const [taskLists, setTaskLists] = useState<TaskDto[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const { board, tasks } = await getBoards(salt);
        setBoard({ ...board });
        setTaskLists(tasks);
      } catch (e) {
        console.log(e);
        router.history.push("/not-found");
      } finally {
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ event: "user" }));
        } else if (ws.readyState === ws.CLOSED) {
          ws.onopen = function() {
            console.log("connected");
            ws.send(toServer);
          };
        }
        ws.onmessage = function(response) {
          console.log(response, "message from server");
          const { data } = response;
          const res = JSON.parse(data);
          if (res.message === "update") {
            resettingTasks();
          }
        };
      }
    }
    fetchTasks();
  }, [salt, router]);

  const onShareHandler = async function() {
    try {
      await copyLink();
      setTimeout(() => setAlert(false), 4000);
      setAlert(true);
    } catch (e) {
      console.error(e);
    }
  };

  const resettingTasks = async function(task?: TaskDto) {
    console.log(task, "task");
    // needed because we shouldn't lose this progress.
    // meaning if user is adding a new task or editing the existing one.
    if (task) {
      task.isEditable = false;
      task.isNewTask = false;
      for (let i = 0; i < taskLists.length; i++) {
        const t = taskLists[i];
        if (t.id === task.id) {
          taskLists.splice(i, 1);
          taskLists.push(task);
          break;
        } else if (t.isNewTask) {
          taskLists.splice(i, 1);
          taskLists.push(task);
          break;
        }
      }
      setTaskLists([...taskLists]);
    } else {
      const { tasks, board } = await getBoards(salt);
      const oldTasks = taskLists.filter(
        (t: TaskDto) => t.isEditable || t.isNewTask
      );
      setBoard({ ...board });

      setTaskLists([...oldTasks, ...tasks]);
    }
  };

  // callback method for taskview component
  const onTaskViewDeleteHandler = async function(status: boolean) {
    if (status) {
      await resettingTasks();
      ws.send(toServer);
    } else {
      console.log("Delete opertion failed"); // show alert later
    }
  };

  const onTaskAddOrEditCallback = async function(task: TaskDto) {
    await resettingTasks(task);
    ws.send(toServer);
  };

  const onDeleteTaskAddHandler = async function(task: TaskDto) {
    const idx = taskLists.indexOf(task);
    if (idx > -1) {
      taskLists.splice(idx, 1);
      setTaskLists([...taskLists]);
      ws.send(toServer);
    }
  };

  const renderTaskView = function(templateId: number): React.ReactNodeArray {
    return taskLists.map((task: TaskDto) => {
      if (
        task.boardTemplateId === templateId &&
        !task.isEditable &&
        !task.isNewTask
      ) {
        return (
          <TaskView
            key={uuid.v4()}
            task={task}
            boardTemplateId={templateId}
            signature={salt}
            onDeleteHandler={onTaskViewDeleteHandler}
            onEditHandler={onEditHandler}
            maxVoteLimit={board.votes}
            board={board}
          />
        );
      }
      return null;
    });
  };

  const renderTaskAddOrEdit = function(
    templateId: number
  ): React.ReactNodeArray {
    return taskLists.map((task: TaskDto) => {
      if (task.boardTemplateId === templateId) {
        if (task.isEditable && !task.isNewTask) {
          // return the editing mode of exisitng task
          return (
            <TaskAdd
              key={uuid.v4()}
              task={task}
              boardTemplateId={templateId}
              signature={salt}
              onCallBack={onTaskAddOrEditCallback}
            />
          );
        } else if (task.isNewTask && !task.isEditable) {
          // return the newly created task
          return (
            <TaskAdd
              key={uuid.v4()}
              task={task}
              boardTemplateId={templateId}
              signature={salt}
              onCallBack={onTaskAddOrEditCallback}
              onDeleteCallBack={onDeleteTaskAddHandler}
            />
          );
        }
      }
      return null;
    });
  };

  const onEditHandler = function(task: TaskDto) {
    setTaskLists([...taskLists]);
  };

  const addNewTaskHandler = function(templateId: number) {
    const newTask: TaskDto = {
      boardTemplateId: templateId,
      description: "",
      noOfVotes: 0,
      isEditable: false,
      isNewTask: true,
      id: taskLists.length + 1, // dummy id
      annonymousToken: anonymousUser()
    };
    setTaskLists([newTask, ...taskLists]);
  };

  if (!board) return <Loading />;

  return (
    <>
      <div className="py-2 border-b border-b-2">
        {showAlert && (
          <div className="mb-3">
            <Alert
              status={Status.SUCCESS}
              callbackHandler={() => setAlert(false)}
            >
              <h1>Public board link copied!!</h1>
            </Alert>
          </div>
        )}
        <PublicBoardHeader
          onShareHandler={onShareHandler}
          board={board}
          router={router}
        />
      </div>
      <div className="area flex flex-col md:flex-row flex-wrap -mx-2 overflow-hidden">
        {board.templates.map((template: BoardColumn) => (
          <div
            key={template.id}
            className="my-2 px-2 w-full md:overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3 border-dashed border-r-4 hide-last-border"
          >
            <div className="flex flex-col">
              <div>
                <span
                  className="uppercase block block truncate"
                  title={template.name}
                >
                  {template.name}
                </span>
                <PrimaryBtn
                  label="+"
                  name="add"
                  onClickEvent={() => addNewTaskHandler(template.id)}
                />
              </div>
              {renderTaskAddOrEdit(template.id)}
              {renderTaskView(template.id)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
