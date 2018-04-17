import React, { Component } from 'react';
import classNames from 'classnames';

import { formatTime } from '../../utils';

import './Track.css';

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

      const className = classNames('track-list_item', { 'track-list_item__select': isTrackSelected && playerState.progress > 0 });

      return (
        <div className={className} onClick={this.handleClick}>
          <div className="track-list_name">
            {`${track.artist} - ${track.title}`}
          </div>
          {isTrackSelected && (
          <div className="track-list_time">
              {`${formatTime(playerState.progress * playerState.duration)} / ${formatTime(playerState.duration)}`}
          </div>
              )}
        </div>
      );
    }
}
