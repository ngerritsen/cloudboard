import { ofType } from 'redux-observable';
import { ignoreElements, tap, withLatestFrom } from 'rxjs/operators';

import { ADD_FAVORITE, REMOVE_FAVORITE, FAVORITES_STORAGE_KEY } from '../constants';

export default function collectionEpic(action$, $state) {
  return action$.pipe(
    ofType(ADD_FAVORITE, REMOVE_FAVORITE),
    withLatestFrom($state),
    tap(([, state]) => localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favorites))),
    ignoreElements()
  );
}
