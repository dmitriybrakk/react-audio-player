import React from 'react';

import NextIcon from '../svg/Next';
import PreviousIcon from '../svg/Previous';
import PlayIcon from '../svg/Play';
import PauseIcon from '../svg/Pause';

import './Controls.css';

export default ({
  playerState, onTogglePlay, onPlayPrevious, onPlayNext
}) => (
  <div className="controls">
    <div className="audio-control splash-anim">
      <button className="audio-control_btn" onClick={onTogglePlay}>
        {playerState.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
    <div className="audio-control splash-anim">
      <button className="audio-control_btn" onClick={onPlayPrevious}>
        <PreviousIcon />
      </button>
    </div>
    <div className="audio-control splash-anim">
      <button className="audio-control_btn" onClick={onPlayNext}>
        <NextIcon />
      </button>
    </div>
  </div>
);
