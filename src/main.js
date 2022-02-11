import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Cloudboard from './components/cloudboard';
import Board from './components/board';
import BoardPicker from './components/board-picker';
import BoardChangeListener from './components/board-change-listener';

import './styles/base.scss';
import './styles/loader.scss';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Cloudboard>
        <Routes>
          <Route path="/" element={<BoardPicker />}/>
          <Route path="/local" element={<Board localMode />}/>
          <Route path="/board/:board" element={<Board />}/>
        </Routes>
        <BoardChangeListener/>
      </Cloudboard>
    </Router>
  </Provider>,
  rootEl
);
