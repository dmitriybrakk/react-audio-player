import React, { Component } from 'react';

import Player from '../player/Player';
import Track from '../track-item/Track';

import './App.css';

export class App extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.getSongs();
  }

  handleClickTrack = (track) => {
    const { currentTrack, playerState, actions } = this.props;

    if (currentTrack.id === track.id) {
      if (playerState.isPlaying) {
        this.handlePause();
      } else {
        this.handlePlay();
      }
    } else {
      if (playerState.progress > 0) {
        actions.resetCurrentTrack();
      }

      actions.selectTrack(track);
      actions.setDuration(this._audio._player.duration);
      this.handlePlay();
    }
  };

    handlePlayPrevious = () => {
      const { actions } = this.props;

      actions.resetCurrentTrack();
      actions.playPrevious();
    };

    handlePlayNext = () => {
      const { actions } = this.props;

      actions.resetCurrentTrack();
      actions.playNext();
    };

    handlePlay = () => {
      const { actions, playerState } = this.props;
      if (!playerState.duration) {
        actions.setDuration(this._audio._player.duration);
      }

      actions.play();
      this._audio._player.play();
    };

    handlePause = () => {
      this.props.actions.pause();
      this._audio._player.pause();
    };

    handleSetProgress = (progress) => {
      this.props.actions.setProgress(progress);
    };

    handleChangeInput = (e) => {
      const { playlist, actions } = this.props;
      const searchQuery = e.target.value;

      if (!searchQuery) {
        actions.filterTracksByQuery(playlist);
      } else {
        const filteredTracksByArtists = playlist.filter(t => (new RegExp(searchQuery, 'i').test(t.artist)));
        const filteredTracksByTitle = playlist.filter(t => (new RegExp(searchQuery, 'i').test(t.title)));

        if (filteredTracksByArtists.length) {
          actions.filterTracksByQuery(filteredTracksByArtists);
        } else if (filteredTracksByTitle.length) {
          actions.filterTracksByQuery(filteredTracksByTitle);
        }
      }
    };

    render() {
      const { filteredTracks, currentTrack, playerState } = this.props;

      return (
        <div className="app">
          <Player
            ref={(ref) => { this._audio = ref; }}
            currentTrack={currentTrack}
            playerState={playerState}
            onPlayPrevious={this.handlePlayPrevious}
            onPlayNext={this.handlePlayNext}
            onPlay={this.handlePlay}
            onPause={this.handlePause}
            onSetProgress={this.handleSetProgress}
          />
          <div className="input">
            <input type="search" placeholder="Search for artists or tracks" onChange={this.handleChangeInput} />
          </div>
          {filteredTracks.length && filteredTracks.map(track => (
            <Track
              key={track.id}
              track={track}
              playerState={playerState}
              onClickTrack={this.handleClickTrack}
              isTrackSelected={currentTrack.id === track.id}
            />
            ))}
        </div>
      );
    }
}
