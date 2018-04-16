import React, { Component } from 'react';

import { formatTime } from '../../utils';

export default class Track extends Component {
    handleClick = () => {
      const { onClickTrack, track } = this.props;

      onClickTrack(track);
    };

    render() {
      const {
        track,
        isTrackSelected,
        playerState
      } = this.props;

      return (
        <div onClick={this.handleClick}>
          <div>{track.artist}</div>
          <div>{track.title}</div>
          {isTrackSelected && (
            <div>{`${formatTime(playerState.progress * playerState.duration)} / ${formatTime(playerState.duration)}`}</div>
          )}
        </div>
      );
    }
}
