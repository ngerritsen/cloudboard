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
      <Routes>
        <Route path="/" render={({ location }) =>
          <Cloudboard location={location}>
            <Route path="/" exact component={BoardPicker}/>
            <Route path="/local" component={Board}/>
            <Route path="/board/:board" component={Board}/>
            <BoardChangeListener/>
          </Cloudboard>
        }/>
      </Routes>
    </Router>
  </Provider>,
  rootEl
);
