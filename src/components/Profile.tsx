import React, { useState, MouseEvent, SyntheticEvent, useEffect } from "react";
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

const Profile = () => {
  const auth = useAuth();
  const { user } = auth;

  const [showModal, setModal] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);

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
  const template: string =
    "what went well => what didn't go well => Action items";
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
    console.log(options);
  };

  const onBoardDelete = async function(id: number) {
    try {
      await api.deleteBoard(id);
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
  return (
    <div id="profile">
      <Model
        title="Create a board"
        onCancel={() => {
          setModal(false);
        }}
        onSave={onSaveBoard}
        show={showModal}
      >
        <Card title="">
          <div className="flex flex-col">
            {errorAlert && (
              <Alert
                status={Status.DANGER}
                callbackHandler={() => setErrorAlert(false)}
              >
                <h1>Failed to create.</h1>
              </Alert>
            )}
            <div>
              <Input
                type="text"
                name="name"
                value={options.name}
                placeholder="Board name"
                onChangeEvent={onChangeHandler}
              />
            </div>
            <div>
              <Input
                type="number"
                name="votes"
                value={Number(options.votes)}
                placeholder="No of votes"
                onChangeEvent={onChangeHandler}
              />
            </div>
            <div className="py-5 text-center">
              <span className="text-2xl">{template}</span>
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
      <div className="grid grid-flow-row-dense grid-cols-3 gap-10">
        {boards.map(o => (
          <div key={o.id}>
            <BoardBox
              name={o.name}
              id={o.id}
              salt={`public/${o.salt}`}
              createdAt={o.createdAt}
              templates={o.templates}
              onDelete={onBoardDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Profile);
