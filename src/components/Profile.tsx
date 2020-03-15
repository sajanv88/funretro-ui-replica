import React, { useState, MouseEvent, SyntheticEvent, useEffect } from "react";
import { withRouter, RouteChildrenProps, Redirect } from "react-router-dom";
import { useAuth, Board } from "../context/context";
import ToolBar from "./Toolbar";
import BoardBox, { BOARD_EVENT, CheckBoxEnum } from "./Board";
import Model from "./Modal";
import Card from "./Card";
import Input from "./Input";
import Alert, { Status } from "./Alert";
import CheckBox from "./CheckBox";
import Api from "../api/Profile";

const api = Api();

const Profile = ({ history }: RouteChildrenProps) => {
  const auth = useAuth();
  const { user } = auth;
  const [showModal, setModal] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [url, setUrl] = useState<string>("");

  const [options, setOptions] = useState({
    disableVotes: false,
    shouldHideTask: false,
    hideVoteCount: false,
    votes: 3,
    name: "",
    columns: [
      {
        name: "what went well?",
        id: 1
      },
      {
        name: "what didn't go well?",
        id: 2
      },
      {
        name: "Action items?",
        id: 3
      }
    ]
  });

  useEffect(() => {
    if (user) {
      setBoards([...user.boards]);
    }
  }, [user]);

  const onCreateABoard = function(e: MouseEvent) {
    setModal(true);
  };

  const onSaveBoard = async function(e: MouseEvent) {
    try {
      await api.saveBoard(options);
      const newBoards = await api.getBoards();
      setBoards(newBoards);
      setModal(false);
    } catch (e) {
      setErrorAlert(true);
      throw e;
    }
  };

  const onBoardDelete = async function(id: number) {
    try {
      await api.deleteBoard(id);
      const board = boards.find(o => o.id === id);
      const idx = boards.indexOf(board as Board);
      boards.splice(idx, 1);
      setBoards([...boards]);
    } catch (e) {
      throw e;
    }
  };

  const onBoardClone = async function(id: number) {
    try {
      await api.cloneBoard(id);
      const newBoards = await api.getBoards();
      setBoards(newBoards);
    } catch (e) {
      throw e;
    }
  };

  const onChangeHandler = function(e: SyntheticEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === CheckBoxEnum.NAME) options.name = value;
    if (name === CheckBoxEnum.NO_OF_VOTES) options.votes = parseInt(value);
    setOptions({ ...options });
  };

  const onCheckBoxChanged = function(e: SyntheticEvent) {
    const { value } = e.target as HTMLInputElement;
    if (value === CheckBoxEnum.DISABLE_VOTES) {
      options.disableVotes = !options.disableVotes;
    }
    if (value === CheckBoxEnum.SHOULD_HIDE_TASK) {
      options.shouldHideTask = !options.shouldHideTask;
    }
    if (value === CheckBoxEnum.HIDE_VOTE_COUNT) {
      options.hideVoteCount = !options.hideVoteCount;
    }
    setOptions({ ...options });
  };

  window.addEventListener(BOARD_EVENT.COPIED, function copiedLinkEvent(e) {
    setAlert(true);
    setTimeout(function onTimeout() {
      setAlert(false);
      window.removeEventListener(BOARD_EVENT.COPIED, copiedLinkEvent);
    }, 4000);
  });

  if (url) {
    return <Redirect to={url} />;
  }

  return (
    <div id="profile">
      <Model
        title=""
        onCancel={() => {
          setModal(false);
        }}
        onSave={onSaveBoard}
        show={showModal}
        shouldDisableBtn={options.name === ""}
      >
        <Card title="Create a board">
          <div className="flex flex-col">
            {errorAlert && (
              <Alert
                status={Status.DANGER}
                callbackHandler={() => setErrorAlert(false)}
              >
                <h1>Failed to create.</h1>
              </Alert>
            )}
            <div className="py-3">
              <span className="text-gray-700">
                minimum 5 characters required
                <em className="text-red-600 pl-1">*</em>
              </span>
              <Input
                type="text"
                name="name"
                value={options.name}
                placeholder="Board name"
                onChangeEvent={onChangeHandler}
              />
            </div>
            <div className="py-3">
              <span className="text-gray-700">
                minimum 3 and maximum 6 votes per board
                <em className="text-red-600 pl-1">*</em>
              </span>
              <Input
                type="number"
                name="votes"
                value={Number(options.votes)}
                placeholder="No of votes"
                min={3}
                max={6}
                onChangeEvent={onChangeHandler}
              />
            </div>

            <div className="py-5">
              <div className="flex items-center justify-around">
                <CheckBox
                  name="Disable Votes"
                  value="disableVotes"
                  onChange={onCheckBoxChanged}
                  isChecked={options.disableVotes}
                />
                <CheckBox
                  name="Should hide tasks"
                  value="shouldHideTask"
                  onChange={onCheckBoxChanged}
                  isChecked={options.shouldHideTask}
                />
                <CheckBox
                  name="Hide vote count"
                  value="hideVoteCount"
                  onChange={onCheckBoxChanged}
                  isChecked={options.hideVoteCount}
                />
              </div>
            </div>
          </div>
        </Card>
      </Model>

      <ToolBar onCallBack={onCreateABoard} />
      <hr />
      {showAlert && (
        <Alert status={Status.SUCCESS} callbackHandler={() => setAlert(false)}>
          <h1>Public board link copied!!</h1>
        </Alert>
      )}
      <div className="flex flex-col md:flex-row flex-wrap -mx-2 overflow-hidden">
        {boards.map(o => (
          <div
            key={o.id}
            onClick={() =>
              setUrl(`/public/${window.encodeURIComponent(o.salt)}`)
            }
            className="my-2 px-2 w-full md:overflow-hidden md:w-1/3 lg:w-1/2 xl:w-1/3"
          >
            <BoardBox
              name={o.name}
              id={o.id}
              salt={`public/${o.salt}`}
              createdAt={o.createdAt}
              templates={o.templates}
              onDelete={onBoardDelete}
              onClone={onBoardClone}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRouter(Profile);
