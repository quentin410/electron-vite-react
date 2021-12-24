import React, { useReducer } from 'react'
import { reducer, initialState, Context } from './reducers'
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from 'react-router'
import Home from './pages/Home/App'

export default () => {
  const store = useReducer(reducer, initialState)
  return < Context.Provider value={store} >
    <Router>
      <Switch>
          <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  </Context.Provider >
}
