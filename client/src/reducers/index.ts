import React from "react";

export const initialState = {};
export const reducer = (state, action) => {
  switch (action.type) {
    case "SOME_CASE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const Context = React.createContext(null);
