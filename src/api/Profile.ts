import { Api } from "./ApiInstance";
import { CreateBoardDto } from "../components/Board";
import { Board } from "../context/context";

const getAuthorization = function() {
  return { Authorization: `Bearer ${window.localStorage.getItem("token")}` };
};
export default () => {
  return {
    getProfile: async () => {
      let response = null;
      try {
        response = await Api.get("/board/profile", {
          headers: { ...Headers, ...getAuthorization() }
        });
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    getBoards: async () => {
      let response = null;
      try {
        response = await Api.get("/board/boards", {
          headers: { ...Headers, ...getAuthorization() }
        });
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    saveBoard: async (newBoard: CreateBoardDto) => {
      let response = null;
      try {
        response = await Api.post("/board/create", newBoard, {
          headers: { ...Headers, ...getAuthorization() }
        });
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    updateBoard: async (boardId: number, params: Board) => {
      let response = null;
      try {
        response = await Api.put(`/board/${boardId}`, params, {
          headers: { ...Headers, ...getAuthorization() }
        });
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    deleteBoard: async (id: number) => {
      let response = null;
      try {
        response = await Api.delete(`/board/${id}`, {
          headers: { ...Headers, ...getAuthorization() }
        });
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    cloneBoard: async (id: number) => {
      let response = null;
      try {
        response = await Api.get(`/board/clone/${id}`, {
          headers: { ...Headers, ...getAuthorization() }
        });
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  };
};
