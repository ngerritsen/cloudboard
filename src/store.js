import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import rawCollections from '../etc/sound-collections.json';
import { isMobileBrowser as checkIfMobileBrowser, hasLocalStorage } from './helpers/browser';
import { getSoundsAndCollectionsFromRawConfig } from './helpers/collections';
import { getFavorites } from './helpers/favorites';
import * as reducers from './reducers';

import keyEpic from './epics/key-epic';
import collectionEpic from './epics/collection-epic';
import favoritesEpic from './epics/favorites-epic';
import queueEpic from './epics/queue-epic';
import playerEpic from './epics/player-epic';

const { collections, sounds } = getSoundsAndCollectionsFromRawConfig(rawCollections);
const favorites = getFavorites();
const isMobileBrowser = checkIfMobileBrowser();
const remoteMode = isMobileBrowser;
const epicMiddleware = createEpicMiddleware();

const reducer = combineReducers({
  ...reducers,
  remoteMode: () => remoteMode,
  sounds: () => sounds,
  isMobileBrowser: () => isMobileBrowser
});

const epics = [queueEpic, playerEpic];

if (hasLocalStorage()) {
  epics.push(collectionEpic, favoritesEpic);
}

if (!isMobileBrowser) {
  epics.push(keyEpic);
}

const middlewares = [
  epicMiddleware
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

const store = createStore(
  reducer,
  { collections, remoteMode, favorites },
  applyMiddleware(...middlewares)
);

epicMiddleware.run(combineEpics(...epics));

export default store;
