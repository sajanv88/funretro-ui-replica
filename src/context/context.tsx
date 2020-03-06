import React, { useContext, useEffect, useState } from "react";
import Action from "../api/Profile";
import Loading from "../components/Loading";

interface ContextProps {
  user: User | null;
  loaded: boolean;
}

const initalProps: ContextProps = {
  user: null,
  loaded: false
};

const AppContext = React.createContext<ContextProps>(initalProps);

export const useAuth = () => {
  const context = useContext<ContextProps>(AppContext);
  return context;
};

export interface BoardColumn {
  name: string;
  id: number;
}

export interface Board {
  id: number;
  name: string;
  userId: number;
  templates: BoardColumn[];
  salt: string;
  createdAt: string;
}
export interface User {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  isVerfied: boolean;
  boards: Board[];
}
const Api = Action();

const fetchProfile = async function(cb: any, loadedcb: any) {
  try {
    const { user } = await Api.getProfile();
    const userObj: User = user as User;
    cb(userObj);
  } catch (e) {
    window.localStorage.removeItem("token");
    throw e;
  } finally {
    loadedcb(true);
  }
};

export default ({ children }: any) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    fetchProfile(setProfile, setLoaded);
  }, []);

  if (!loaded) return <Loading />;
  const props: ContextProps = {
    user: profile,
    loaded: loaded
  };
  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
};
