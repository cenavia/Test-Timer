import React from 'react'
import { Timer, TimerLabel, TimerLeft } from './styles'

const TimerDisplay = (props) => {
  const { time, mode } = props;

  const min = Math.floor(time / 1000 / 60);
  const sec = Math.floor((time / 1000) % 60);
  return (
    <Timer>
      <TimerLabel>{mode}</TimerLabel>
      <TimerLeft>
        {min}:{sec.toString().length === 1 ? "0" + sec : sec}
      </TimerLeft>
    </Timer>
  );
};

export default TimerDisplay;