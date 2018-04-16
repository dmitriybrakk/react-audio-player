import * as types from '../constants/action-types/tracks';
import data from '../constants/songs';

export function getSongs() {
  return { type: types.INIT, payload: data.songs };
}

export function playNext() {
  return { type: types.NEXT };
}

export function playPrevious() {
  return { type: types.PREVIOUS };
}

export function selectTrack(track) {
  return { type: types.SELECT_TRACK, payload: track };
}

export function filterTracksByQuery(tracks) {
  return { type: types.FILTER_TRACKS, payload: tracks };
}
