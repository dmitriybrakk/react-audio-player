import React, { Component } from 'react';

import { formatTime, offsetLeft } from '../../utils';

import NextIcon from '../svg/Next';
import PreviousIcon from '../svg/Previous';
import PlayIcon from '../svg/Play';
import PauseIcon from '../svg/Pause';
import SpeakerIcon from '../svg/Speaker';

import './Player.css';

export default class Player extends Component {
  constructor() {
    super();

    this.state = {
      inSetProgressMode: false
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
        const progress = (evt.clientX - offsetLeft(this._progressBar)) / this._progressBar.clientWidth;
        this.isProgressDirty = true;
        onSetProgress(progress);
      }
    };

    handleUpdateProgress = () => {
      const { onSetProgress, playerState, onPlayNext } = this.props;

      if (this._player) {
        if (!this.isProgressDirty && playerState.isPlaying) {
          onSetProgress(this._player.currentTime / playerState.duration);
        }

        if (this._player.ended) {
          onPlayNext();
        }
      }
    };

    render() {
      const {
        currentTrack,
        playerState,
        onPlayPrevious,
        onPlayNext,
        onPlay,
        onPause,
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
          <div className="controls">
            <button onClick={onPlayPrevious}><PreviousIcon /></button>
            {!playerState.isPlaying && (
              <button onClick={onPlay}><PlayIcon /></button>
            )}
            {playerState.isPlaying && (
              <button onClick={onPause}><PauseIcon /></button>
            )}
            <button onClick={onPlayNext}><NextIcon /></button>
          </div>
          <div
            onMouseDown={this.handleStartSetProgress}
            onMouseMove={this.handleSetProgress}
            onMouseLeave={this.handleStopSetProgress}
            onMouseUp={this.handleStopSetProgress}
            className="progress"
          >
            <div ref={(ref) => { this._progressBar = ref; }} className="bar">
              <div style={{ width: `${this.props.playerState.progress * 100}%` }} />
            </div>
          </div>
          <div className="time">
            {formatTime(currentTime)} / {formatTime(totalTime)}
          </div>
          <audio
            ref={(ref) => { this._player = ref; }}
            autoPlay={playerState.isPlaying}
            src={currentTrack.audioFile}
            volume={playerState.volume}
          />
        </div>
      );
    }
}
