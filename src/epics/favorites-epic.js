import { ofType } from 'redux-observable';
import { tap, withLatestFrom, ignoreElements } from 'rxjs/operators';

import { TOGGLE_COLLECTION, COLLAPSED_COLLECTIONS_STORAGE_KEY } from '../constants';
import { getCollapsedCollections } from '../selectors';

export default function favoritesEpic(action$, $state) {
  return action$.pipe(
    ofType(TOGGLE_COLLECTION),
    withLatestFrom($state),
    tap(([, state]) => localStorage.setItem(COLLAPSED_COLLECTIONS_STORAGE_KEY, JSON.stringify(getCollapsedCollections(state)))),
    ignoreElements()
  );
}
