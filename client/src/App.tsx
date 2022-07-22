import React from 'react';
import logo from './logo.svg';
import './App.scss';

import { Provider } from 'react-redux';
import {store} from './redux/store'

import Weather from "./Weather";

function App() {
  return (
    <Provider store={store}>
      <Weather />
    </Provider>
  );
}

export default App;
