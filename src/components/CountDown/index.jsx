import React, { Component } from "react";
import { 
    Countdown, 
    CountdownHeader, 
    CountdownDisplay,
    CountdownLabel,
    Button,
    ButtonStart,
    ButtonReset,
    ButtonStop
} from './styles';

class CountDown extends Component {

  state = {
    timerOn: false,
    animateOn: false,
    timerStart: 0,
    timerTime: 0
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart
      });
    }
  };

  adjustTimer = input => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      if (input === "incHours" && timerTime + 3600000 < 216000000) {
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === "incMinutes" && timerTime + 60000 < 216000000) {
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === "incSeconds" && timerTime + 1000 < 216000000) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      }
    }
  };

  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <Countdown>
        <CountdownHeader>CountdownTimer</CountdownHeader>
        <CountdownLabel>Hours : Minutes : Seconds</CountdownLabel>
        <CountdownDisplay>
          <Button onClick={() => this.adjustTimer("incHours")}>&#8679;</Button>
          <Button onClick={() => this.adjustTimer("incMinutes")}>
            &#8679;
          </Button>
          <Button onClick={() => this.adjustTimer("incSeconds")}>
            &#8679;
          </Button>

          <div className="Countdown-time">
            {hours} : {minutes} : {seconds}
          </div>

          <Button onClick={() => this.adjustTimer("decHours")}>&#8681;</Button>
          <Button onClick={() => this.adjustTimer("decMinutes")}>
            &#8681;
          </Button>
          <Button onClick={() => this.adjustTimer("decSeconds")}>
            &#8681;
          </Button>
        </CountdownDisplay>

        {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
          <ButtonStart onClick={this.startTimer}>
            Start
          </ButtonStart>
        )}
        {timerOn === true && timerTime >= 1000 && (
          <ButtonStop onClick={this.stopTimer}>
            Stop
          </ButtonStop>
        )}
        {timerOn === false &&
          (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
           <div>
               <ButtonStart onClick={this.startTimer}>
                    Resume
                </ButtonStart>
           </div>
          )}

        {(timerOn === false || timerTime < 1000) &&
          (timerStart !== timerTime && timerStart > 0) && (
            <ButtonReset onClick={this.resetTimer}>
              Reset
            </ButtonReset>
          )}
      </Countdown>
    );
  }
}

export default CountDown;