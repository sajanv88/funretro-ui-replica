import { Api } from "./ApiInstance";
interface SignupDto {
  email: string;
  fullName: string;
  password: string;
}
interface LoginDto {
  email: string;
  password: string;
}
export const Action = () => ({
  signup: async (params: SignupDto) => {
    let response = null;
    try {
      response = await Api.post("/auth/signup", params);
    } catch (e) {
      console.log(e);
      throw e;
    }
    return response;
  },
  login: async (params: LoginDto) => {
    let response = null;
    try {
      response = await Api.post("/auth/signin", params);
    } catch (e) {
      console.log(e);
      throw e;
    }
    return response;
  }
});
