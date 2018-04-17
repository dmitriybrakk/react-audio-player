import React, { Component } from 'react';

import { formatTime } from '../../utils';

import Controls from '../controls/Controls';
import ProgressBar from '../progress-bar/ProgressBar';
import Volume from '../volume/Volume';
import SpeakerIcon from '../svg/Speaker';

import './Player.css';

export default class Player extends Component {
  render() {
    const {
      currentTrack,
      playerState,
      onPlayPrevious,
      onPlayNext,
      onTogglePlay,
      onSetProgress,
      onSetVolume
    } = this.props;

    return (
      <div className="player">
        <Controls
          playerState={playerState}
          onTogglePlay={onTogglePlay}
          onPlayPrevious={onPlayPrevious}
          onPlayNext={onPlayNext}
        />

        <ProgressBar
          player={this._player}
          playerState={playerState}
          onPlayNext={onPlayNext}
          onSetProgress={onSetProgress}
        />

        <div className="progress-bar-time">
          {this._player && formatTime(this._player.currentTime)} / {formatTime(playerState.duration)}
        </div>

        <div className="progress-bar-volume-handle">
          <SpeakerIcon />
        </div>

        <Volume
          player={this._player}
          playerState={playerState}
          onSetVolume={onSetVolume}
        />

        <audio
          ref={(ref) => { this._player = ref; }}
          autoPlay={playerState.isPlaying}
          src={currentTrack.audioFile}
        />
      </div>
    );
  }
}
