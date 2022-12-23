import { createContext, useEffect, useReducer } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const INITIAL_USER = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  console.log("dispatched", action);
  switch (type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error("error type");
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatcher] = useReducer(userReducer, INITIAL_USER);

  const setCurrentUser = (user) => {
    dispatcher({ type: "SET_CURRENT_USER", payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
