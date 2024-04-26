import { createContext, useContext, useReducer } from "react";
import IUserProfile from "../interfaces/IUserProfile";

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(loadingReducer, initial);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser(): IUserProfile {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

function loadingReducer(state, action) {
  switch (action.type) {
    case "set": {
      return { ...state, ...action.payload };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initial: IUserProfile = {
  email: "",
};
