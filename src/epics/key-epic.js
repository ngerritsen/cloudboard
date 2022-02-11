import { fromEvent } from 'rxjs';
import { throttleTime, map, filter, withLatestFrom } from 'rxjs/operators';

import { queue } from '../actions/sound-actions';
import { SOUND_THROTTLE, keyCodeMap, favoriteKeyIndex } from '../constants';

export default function keyEpic(_, $state) {
  return fromEvent(document, 'keyup').pipe(
    throttleTime(SOUND_THROTTLE),
    map(event => keyCodeMap[event.which]),
    withLatestFrom($state),
    map(([key, state]) => {
      const index = favoriteKeyIndex.indexOf(key);
      return state.favorites[index];
    }),
    filter(Boolean),
    map(favorite => queue(favorite.sound, favorite.collection))
  );
}
