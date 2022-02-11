/* global ga */

import shortid from 'shortid';
import { Observable } from 'rxjs';
import { map, filter, tap, merge, throttleTime, withLatestFrom } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { QUEUE, SOUND_THROTTLE } from '../constants';
import { SERVER_PLAY } from '../../server/constants';
import { play } from '../actions/sound-actions';
import { serverQueue } from '../../server/events';
import { isInLocalMode } from '../helpers/routing';
import { hasLocalStorage } from '../helpers/browser';
import socket from '../socket';

export default function queueEpic(action$, $state) {
  const serverAction$ = serverSource().pipe(
    withLatestFrom($state),
    filter(([event, state]) => event.board === state.board || event.admin),
    map(([{ id, collection, sound }]) => play(id, collection, sound))
  );

  return action$.pipe(
    ofType(QUEUE),
    throttleTime(SOUND_THROTTLE),
    tap(action => {
      const label = action.collection + ':' + action.sound;
      ga('send', 'event', 'Soundboard', 'play', label);
    }),
    map(action => ({
      action,
      localMode: isInLocalMode(),
      id: shortid.generate()
    })),
    withLatestFrom($state),
    tap(([{ action, id, localMode }, state]) => {
      if (!localMode) {
        broadcastSound(state, action, id);
      }
    }),
    filter(([{ localMode }]) => localMode),
    map(([{ action, id }]) => {
      const { collection, sound } = action;
      return play(id, collection, sound);
    }),
    merge(serverAction$)
  );
}

function broadcastSound({ board }, action, id) {
  const { collection, sound } = action;
  const adminToken = hasLocalStorage() && localStorage.getItem('adminToken');
  const { event, data } = serverQueue(id, board, collection, sound);

  if (adminToken) {
    data.adminToken = adminToken;
  }

  socket.emit(event, data);
}

function serverSource() {
  return Observable.create(observer => {
    socket.on(SERVER_PLAY, event => {
      observer.next(event);
    });
  });
}
