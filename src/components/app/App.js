import React, { Component } from 'react';

import Player from '../player/Player';
import Track from '../track-item/Track';

import './App.css';

export class App extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.getSongs();
  }

  resetCurrentTrack = () => {
    const { actions, playerState } = this.props;

    if (!playerState.isPlaying) {
      this._audio._player.currentTime = 0;
    }
    actions.resetCurrentTrack();
  };

  handleClickTrack = (track) => {
    const { currentTrack, actions } = this.props;

    if (currentTrack.id === track.id) {
      this.handleTogglePlay();
    } else {
      this.resetCurrentTrack();

      actions.selectTrack(track);
      actions.setDuration(this._audio._player.duration);

      this.handlePlay();
    }
  };

    handlePlayPrevious = () => {
      const { actions } = this.props;

      this.resetCurrentTrack();

      actions.setDuration(this._audio._player.duration);
      actions.playPrevious();
    };

    handlePlayNext = () => {
      const { actions } = this.props;

      this.resetCurrentTrack();

      actions.setDuration(this._audio._player.duration);
      actions.playNext();
    };

    handlePlay = () => {
      const { actions } = this.props;

      actions.play();
      this._audio._player.play();
    };

    handlePause = () => {
      const { actions } = this.props;
      actions.pause();
      this._audio._player.pause();
    };

    handleTogglePlay = () => {
      const { actions, playerState } = this.props;
      if (!playerState.duration) {
        actions.setDuration(this._audio._player.duration);
      }

      if (!playerState.isPlaying) {
        this.handlePlay();
      } else {
        this.handlePause();
      }
    };

    handleSetProgress = (progress) => {
      this.props.actions.setProgress(progress);
    };

    handleSetVolume = (volume) => {
      this.props.actions.setVolume(volume);
    };

    handleChangeInput = (e) => {
      const { playlist, actions } = this.props;
      const searchQuery = e.target.value;

      if (!searchQuery) {
        actions.filterTracksByQuery(playlist);
      } else {
        const filteredTracks = playlist.filter((t) => {
          const regex = new RegExp(searchQuery, 'i');

          return regex.test(t.artist) || regex.test(t.title);
        });

        actions.filterTracksByQuery(filteredTracks);
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
            onTogglePlay={this.handleTogglePlay}
            onSetProgress={this.handleSetProgress}
            onSetVolume={this.handleSetVolume}
          />

          <input type="search" placeholder="Search for artists or tracks" onChange={this.handleChangeInput} />

          <div className="track-list">
            {!!filteredTracks.length && filteredTracks.map(track => (
              <Track
                key={track.id}
                track={track}
                playerState={playerState}
                onClickTrack={this.handleClickTrack}
                isTrackSelected={currentTrack.id === track.id}
              />
                ))}
            {!filteredTracks.length && (
              <div>
                    No results matching your query
              </div>
              )}
          </div>
        </div>
      );
    }
}
