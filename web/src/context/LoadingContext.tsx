import { createContext, useContext, useReducer } from "react";

const LoadingContext = createContext(null);
const LoadingDispatchContext = createContext(null);

export function LoadingProvider({ children }) {
  const [loading, dispatch] = useReducer(loadingReducer, initial);

  return (
    <LoadingContext.Provider value={loading}>
      <LoadingDispatchContext.Provider value={dispatch}>
        {children}
      </LoadingDispatchContext.Provider>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

export function useLoadingDispatch() {
  return useContext(LoadingDispatchContext);
}

function loadingReducer(state, action) {
  switch (action.type) {
    case "toggle": {
      return !state;
    }
    case "loading-on": {
      return true;
    }
    case "loading-off": {
      return false;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initial = false;
