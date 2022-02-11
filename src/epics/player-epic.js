import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { stopped } from '../actions/sound-actions';
import { PLAY } from '../constants';
import playAudio from '../audio-player';

export default function playerEpic(action$) {
  return action$.pipe(
    ofType(PLAY),
    mergeMap(action => {
      const { id, collection, sound } = action;
      const url = `/sounds/${collection}/${sound}.mp3`;

      return Observable.create(observer => {
        playAudio(url, () => {
          observer.next(stopped(id));
        });
      });
    })
  );
}
