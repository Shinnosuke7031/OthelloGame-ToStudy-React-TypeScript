import React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from "redux";
import { app } from "./reducers";
import { GameContainer } from './containers';
import { Provider } from "react-redux";


const store = createStore(app);

ReactDOM.render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById('root')
);