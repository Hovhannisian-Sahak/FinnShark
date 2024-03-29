import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router";
import { loginApi, registerApi } from "../Services/AuthService";
import { toast } from "react-toastify";
import * as React from "react";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (username: string, email: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};
type Props = { children: React.ReactNode };
const UserContext = createContext<UserContextType>({} as UserContextType);
export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      console.log(user);
      console.log(token);
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);
  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    await registerApi(username, email, password)
      .then((res) => {
        if (res) {
          console.log(res);
          localStorage.setItem("token", res?.data?.token);
          const UserObj = {
            username: res?.data?.username,
            email: res?.data?.email,
          };
          console.log(UserObj);
          localStorage.setItem("user", JSON.stringify(UserObj));
          setUser(UserObj);
          setToken(res?.data?.token || "");
          console.log(token);
          console.log(user);
          toast.success("Successfully signed up!");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning(e.message));
  };
  const loginUser = async (username: string, password: string) => {
    await loginApi(username, password)
      .then((res) => {
        if (res) {
          console.log(res);
          localStorage.setItem("token", res?.data?.token);
          const UserObj = {
            username: res?.data?.username,
            email: res?.data?.email,
          };
          console.log(UserObj);
          localStorage.setItem("user", JSON.stringify(UserObj));
          setUser(UserObj!);
          setToken(res?.data?.token || "");
          toast.success("Successfully logged in!");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning(e.message));
  };
  const isLoggedIn = () => {
    console.log(user);
    return !!user;
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };
  return (
    <UserContext.Provider
      value={{ registerUser, loginUser, token, logout, isLoggedIn, user }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
export const useAuth = () => React.useContext(UserContext);
