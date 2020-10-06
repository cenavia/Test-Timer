import React, { useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import { ControlWrapper } from './components/molecule/ControlWrapper/styles';
import { Button } from 'antd';
import Title from './components/atoms/Title/index';
import TimePicker from './components/atoms/TimePicker/index';
import TimeDisplay from './components/atoms/TimeDisplay/index';

function App() {
  const [mode, setMode] = React.useState("session");
  const [sessionLength, setSessionLength] = React.useState(25 * 60);
  const [timeLeft, setTimeLeft] = React.useState();
  const [isActive, setIsActive] = React.useState(false);
  const [timeSpent, setTimeSpent] = React.useState(0);
  const [beep] = React.useState(
    new Audio("https://freesound.org/data/previews/523/523960_350703-lq.mp3")
  );
  const [beepPlaying, setBeepPlaying] = React.useState(false);

  /* ########## USE EFFECT HOOKS ########## */
  useEffect(() => {
    setTimeLeft(mode === "session" ? sessionLength * 1000 : null);
  }, [sessionLength]);

  React.useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 1) {
      setTimeLeft(
        mode === "session"
          ? sessionLength * 1000 - timeSpent
          : null
      );

      interval = setInterval(() => {
        setTimeSpent((timeSpent) => timeSpent + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (timeLeft === 0) {
      beep.play();
      setBeepPlaying(true);
      setTimeSpent(0);
      setMode((mode) => (mode === "session" ? null : "session"));
      setTimeLeft(
        mode === "session" ? sessionLength * 1000 : null
      );
    }
    return () => clearInterval(interval);
  }, [isActive, timeSpent]);

  React.useEffect(() => {
    beep.addEventListener("ended", () => setBeepPlaying(false));
    return () => {
      beep.addEventListener("ended", () => setBeepPlaying(false));
    };
  }, []);



  /* ########## FUNCTIONS ########## */
  function decremenLength() {
    const decreasedSessionLength =
      sessionLength - 60 > 60 ? sessionLength - 60 : 60;

    setSessionLength(decreasedSessionLength);
  }

  function incrementLength() {
    const incrementedSessionLength =
      sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60;
    setSessionLength(incrementedSessionLength);
  }

  function reset() {
    setSessionLength(25 * 60);
    setTimeLeft(mode === "session" ? sessionLength * 1000 : sessionLength * 1000);

    if (isActive) {
      setIsActive(false);
      setTimeSpent(0);
    }

    if (beepPlaying) {
      beep.pause();
      beep.currentTime = 0;
      setBeepPlaying(false);
    }
  }

  function toggleIsActive() {
    setIsActive(!isActive);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Title title="Timer-Practics" />
        <TimeDisplay time={timeLeft} mode={mode} />
        <ControlWrapper>
          <Button onClick={toggleIsActive} type="primary">
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button type="primary" onClick={reset} danger>
            Reset
          </Button>
        </ControlWrapper>
        <TimePicker
          length={sessionLength}
          decrement={decremenLength}
          increment={incrementLength}
        />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
