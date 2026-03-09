// React dependencies
import React from 'react';
import TimeController from './TimeController'
import Controls from './Controls'

let counter = null;

class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      breakTime: 5,
      sessionTime:1,
      currentTimeType: 'Session',
      currentTime: 60000,
      currentTimeDisplay: '1:00',
      currentClockState: 'paused'
    }
    this.changeBreakTime = this.changeBreakTime.bind(this)
    this.changeSessionTime = this.changeSessionTime.bind(this)
    this.startStopClock = this.startStopClock.bind(this)
    this.resetClock = this.resetClock.bind(this)
  }
  changeBreakTime(change){
    let time = this.state.breakTime+(change)
    if(time >= 1 && time <=60){
      this.setState({
        breakTime:time
      });
    }
  }
  changeSessionTime(change){
    let time = this.state.sessionTime+(change)
    if(time >= 1 && time <=60){
      this.setState({
        sessionTime:time,
        currentTime: time*60000,
        currentTimeDisplay: this.formatTime(time*60000)
      });
    }
  }
  start(){
    console.log('start');
    this.setState({
      currentClockState: 'running'
    })
    counter = setInterval(() => {
        let currentTime = this.state.currentTime - 100
        if (currentTime > 0) {
          this.setState({
            currentTime: currentTime,
            currentTimeDisplay: this.formatTime(currentTime)
          });
        } else{
          this.stop();
        }
      }, 100)
  }
  stop(){
    console.log('stop');
    
    this.setState({
      currentClockState: 'paused'
    })
    clearInterval(counter);
  }
  startStopClock(){
    if(this.state.currentClockState === 'paused'){
        this.start()
    } else{
      this.stop()
    }
  }
  resetClock(){
    this.setState({
      breakTime: 5,
      sessionTime:25,
      currentTimeType: 'Session',
      currentTime: 25*60000,
      currentTimeDisplay: this.formatTime(25*60000),
      currentClockState: 'paused'
    })
  }
  formatTime(time){
    let minutes = Math.floor((time / 60000))
    let seconds = String(Math.floor((time % 60000) / 1000))

    if(seconds.length < 2){
      seconds = '0'+seconds
    }

    return minutes+':'+seconds
  }
  render(){
    return(
      <div id="clock">
        <div id="title">Interval clock</div>
        <div id="time-settings">
          <TimeController changeTime={this.changeBreakTime} title="Break Time" time={this.state.breakTime} />
          <TimeController changeTime={this.changeSessionTime} title="Session Time" time={this.state.sessionTime} />
        </div>
        <div id="timer">
          <p>{this.state.currentTimeType}</p>
          <div>{this.state.currentTimeDisplay}</div>
        </div>
        <Controls startStopClock={this.startStopClock} resetClock={this.resetClock}/>
      </div>
    )
  }
}

export default Clock;