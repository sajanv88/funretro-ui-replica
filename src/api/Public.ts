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
    }
  };
};
