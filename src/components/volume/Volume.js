import React, { Component } from 'react';

import { getLeftOffset } from '../../utils';

import './Volume.css';

export default class Volume extends Component {
  constructor() {
    super();

    this.state = {
      inSetVolumeMode: false,
    };
  }

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
      const { onSetVolume, player } = this.props;

      if (this.state.inSetVolumeMode) {
        const volume = (evt.clientX - getLeftOffset(this._volumeBar)) / this._volumeBar.clientWidth;

        onSetVolume(volume);

        player.volume = volume;
      }
    };

    render() {
      const { playerState } = this.props;

      return (
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
      );
    }
}
