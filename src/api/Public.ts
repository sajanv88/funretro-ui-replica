import { Api } from "./ApiInstance";

export default () => {
  return {
    getPublicBoards: async (signature: string) => {
      let response = null;
      try {
        response = await Api.get(`/public/${signature}`);
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    submitFeedback: async (signature: string, params: any) => {
      let response = null;
      try {
        response = await Api.post(`/public/${signature}`, params);
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    deletePublicTask: async (taskId: number, signature: string) => {
      let response = null;
      try {
        response = await Api.delete(`/public/${taskId}/${signature}`);
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    updateFeedback: async (taskId: number, signature: string, params: any) => {
      let response = null;
      try {
        response = await Api.put(`/public/${taskId}/${signature}`, params);
        console.log(response, "respon");
        return response;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  };
};
