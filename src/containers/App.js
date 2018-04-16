import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSongs, playNext, playPrevious, selectTrack, filterTracksByQuery } from '../actions/tracks';

import { App } from '../components/app/App';
import { pause, play, setProgress, setDuration, updateVolume, resetCurrentTrack } from '../actions/player';

const mapStateToProps = state => ({
  playlist: state.tracksReducer.playlist,
  filteredTracks: state.tracksReducer.filteredTracks,
  currentTrack: state.tracksReducer.currentTrack,
  playerState: state.playerReducer
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getSongs,
    playNext,
    playPrevious,
    play,
    pause,
    setProgress,
    setDuration,
    updateVolume,
    selectTrack,
    resetCurrentTrack,
    filterTracksByQuery
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
