import React, { Component } from 'react';

import Controls from '../controls/Controls';

import SpeakerIcon from '../svg/Speaker';

import { formatTime, getLeftOffset } from '../../utils';

import './Player.css';

export default class Player extends Component {
  constructor() {
    super();

    this.state = {
      inSetProgressMode: false,
      inSetVolumeMode: false
    };

    this.isProgressDirty = false;
    this.progressInterval = setInterval(this.handleUpdateProgress, 250);
  }

    handleStartSetProgress = (evt) => {
      this.setState({
        inSetProgressMode: true
      });
      this.handleSetProgress(evt);
    };

    handleStopSetProgress = (evt) => {
      this.setState({
        inSetProgressMode: false
      });
      this.handleSetProgress(evt);
    };

    handleSetProgress = (evt) => {
      const { onSetProgress } = this.props;

      if (this.state.inSetProgressMode) {
        const progress = (evt.clientX - getLeftOffset(this._progressBar)) / this._progressBar.clientWidth;
        this.isProgressDirty = true;
        onSetProgress(progress);
      }
    };

    handleUpdateProgress = () => {
      const {
        onSetProgress, playerState, onPlayNext
      } = this.props;

      if (this._player) {
        if (!this.isProgressDirty && playerState.isPlaying) {
          onSetProgress(this._player.currentTime / playerState.duration);
        }

        if (this._player.ended) {
          onPlayNext();
        }
      }
    };

    handleStartSetVolume = (evt) => {
      this.setState({
        inSetVolumeMode: true
      });
      this.handleSetVolume(evt);
    };

    handleStopSetVolume = (evt) => {
      this.setState({
        inSetVolumeMode: false
      });
      this.handleSetVolume(evt);
    };

    handleSetVolume = (evt) => {
      const { onSetVolume } = this.props;

      if (this.state.inSetVolumeMode) {
        const volume = (evt.clientX - getLeftOffset(this._volumeBar)) / this._volumeBar.clientWidth;

        onSetVolume(volume);

        this._player.volume = volume;
      }
    };

    render() {
      const {
        currentTrack,
        playerState,
        onPlayPrevious,
        onPlayNext,
        onTogglePlay,
      } = this.props;
      let currentTime = 0;
      let totalTime = 0;

      if (this._player) {
        if (this.isProgressDirty) {
          this.isProgressDirty = false;

          this._player.currentTime = playerState.duration * playerState.progress;
        }

        currentTime = this._player.currentTime;
        totalTime = this._player.duration;
      }

      return (
        <div className="player">
          <Controls
            playerState={playerState}
            onTogglePlay={onTogglePlay}
            onPlayPrevious={onPlayPrevious}
            onPlayNext={onPlayNext}
          />

          <div
            className="progress-bar"
            ref={(ref) => { this._progressBar = ref; }}
            onMouseDown={this.handleStartSetProgress}
            onMouseMove={this.handleSetProgress}
            onMouseLeave={this.handleStopSetProgress}
            onMouseUp={this.handleStopSetProgress}
          >
            <div
              className="progress-bar-track"
              style={{ width: `${playerState.progress * 100}%` }}
            />
          </div>
          <div className="progress-bar-time">
            {formatTime(currentTime)} / {formatTime(totalTime)}
          </div>

          <div className="progress-bar-volume-handle">
            <SpeakerIcon />
          </div>

          <div
            className="progress-bar progress-bar-volume"
            ref={(ref) => { this._volumeBar = ref; }}
            onMouseDown={this.handleStartSetVolume}
            onMouseMove={this.handleSetVolume}
            onMouseLeave={this.handleStopSetVolume}
            onMouseUp={this.handleStopSetVolume}
          >
            <div className="progress-bar-track" style={{ width: `${playerState.volume * 100}%` }} />
          </div>

          <audio
            ref={(ref) => { this._player = ref; }}
            autoPlay={playerState.isPlaying}
            src={currentTrack.audioFile}
          />
        </div>
      );
    }
}
