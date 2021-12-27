import React, { useReducer } from 'react';
import { reducer, initialState, Context } from './reducers';
import Home from './Pages/Home';

export default () => {
  const store = useReducer(reducer, initialState);
  return (
    <Context value={store}>
      <Home />
    </Context>
  );
};
