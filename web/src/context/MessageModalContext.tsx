import { createContext, useContext, useReducer } from "react";
import IMessageModal from "../interfaces/IMessageModal";

const MessageModalContext = createContext(null);
const MessageModalDispatchContext = createContext(null);

export function MessageModalProvider({ children }) {
  const [data, dispatch] = useReducer(loadingReducer, initial);

  return (
    <MessageModalContext.Provider value={data}>
      <MessageModalDispatchContext.Provider value={dispatch}>
        {children}
      </MessageModalDispatchContext.Provider>
    </MessageModalContext.Provider>
  );
}

export function useMessageModal(): IMessageModal {
  return useContext(MessageModalContext);
}

export function useMessageModalDispatch() {
  return useContext(MessageModalDispatchContext);
}

function loadingReducer(state, action) {
  switch (action.type) {
    case "show": {
      return { ...action.payload, isOpen: true };
    }
    case "hide": {
      return { ...state, isOpen: false };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initial: IMessageModal = {
  isOpen: false,
  header: "",
  detail: "",
  btnText: "OK",
  onClick: () => {},
};
