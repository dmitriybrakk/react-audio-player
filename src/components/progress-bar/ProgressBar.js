import React, { Component } from 'react';

import { getLeftOffset } from '../../utils';

import './ProgressBar.css';

export default class ProgressBar extends Component {
  constructor() {
    super();

    this.state = {
      inSetProgressMode: false,
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
        player, onSetProgress, playerState, onPlayNext
      } = this.props;

      if (player) {
        if (!this.isProgressDirty && playerState.isPlaying) {
          onSetProgress(player.currentTime / playerState.duration);
        }

        if (player.ended) {
          onPlayNext();
        }
      }
    };

    render() {
      const {
        player, playerState
      } = this.props;

      if (player) {
        if (this.isProgressDirty) {
          this.isProgressDirty = false;

          player.currentTime = playerState.duration * playerState.progress;
        }
      }

      return (
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
      );
    }
}
