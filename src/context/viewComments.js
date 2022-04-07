import { createContext, useReducer } from "react";
import { viewCommentsReducer } from "./viewCommentsReducer";

export const ViewCommentsContext = createContext();

export default function ViewCommentsContextProvider({ children }) {

  const handleFocus = () => {

  };

  const initialState = {
    allComments: [],
    username: "",
    src: "",
    caption: "",
    posted: 0,
    docId: "",
    totalLikes: 0,
    viewCommentsOpen: false,
    likedPhoto: false,
    commentInput: null,
    handleFocus: handleFocus()
  };

  const [viewCommentsState, dispatchViewComments] = useReducer(
    viewCommentsReducer,
    initialState
  );

  return (
    <ViewCommentsContext.Provider
      value={{ viewCommentsState, dispatchViewComments }}
    >
      {children}
    </ViewCommentsContext.Provider>
  );
}
