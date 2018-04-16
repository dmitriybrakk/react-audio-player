import * as types from '../constants/action-types/tracks';

const initialState = {
  playlist: [],
  currentTrack: {
    id: -1,
    audioFile: null,
    title: 'is playing...',
    artist: 'No song',
  },
  filteredTracks: []
};

const getTrackIndex = (tracks, id) => tracks.findIndex(s => s.id === id);

const getAdjacentTrack = (tracks, startIndex, direction) => {
  if (startIndex === -1) {
    return tracks[0];
  }

  let nextIndex = startIndex + direction;

  if (nextIndex < 0) {
    nextIndex = tracks.length - 1;
  } else if (nextIndex > tracks.length - 1) {
    nextIndex = 0;
  }

  return tracks[nextIndex];
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INIT:
      return {
        ...state,
        playlist: action.payload,
        currentTrack: action.payload[0],
        filteredTracks: action.payload
      };
    case types.NEXT:
      return {
        ...state,
        currentTrack: getAdjacentTrack(state.filteredTracks, getTrackIndex(state.filteredTracks, state.currentTrack.id), 1)
      };
    case types.PREVIOUS:
      return {
        ...state,
        currentTrack: getAdjacentTrack(state.filteredTracks, getTrackIndex(state.filteredTracks, state.currentTrack.id), -1),
      };
    case types.SELECT_TRACK:
      return {
        ...state,
        currentTrack: action.payload
      };
    case types.FILTER_TRACKS:
      return {
        ...state,
        filteredTracks: action.payload
      };
    default:
      return state;
  }
};
