import * as types from '../constants/action-types/player';

export function play() {
  return { type: types.PLAY };
}

export function pause() {
  return { type: types.PAUSE };
}

export function setProgress(progress) {
  return { type: types.SET_PROGRESS, payload: progress };
}

export function setDuration(duration) {
  return { type: types.SET_DURATION, payload: duration };
}

export function updateVolume(volume) {
  return { type: types.UPDATE_VOLUME, payload: volume };
}

export function resetCurrentTrack() {
  return { type: types.RESET_CURRENT_TRACK };
}
