import * as types from '../constants/action-types/player';

const initialState = {
  isPlaying: false,
  volume: 0.5,
  progress: 0,
  duration: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PLAY:
      return {
        ...state,
        isPlaying: true
      };
    case types.PAUSE:
      return {
        ...state,
        isPlaying: false
      };
    case types.SET_PROGRESS:
      return {
        ...state,
        progress: action.payload
      };
    case types.SET_DURATION:
      return {
        ...state,
        duration: action.payload
      };
    case types.UPDATE_VOLUME:
      return {
        ...state,
        volume: action.payload
      };
    case types.RESET_CURRENT_TRACK:
      return {
        ...state,
        progress: 0,
        duration: 0
      };
    default:
      return state;
  }
};
