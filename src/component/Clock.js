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
      currentTime: 3000,
      currentTimeDisplay: '1:00',
      currentClockState: 'paused',
      color:'yellow'
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
        let currentTime = this.state.currentTime - 1000
        console.log(currentTime)
        if(currentTime < 60000 && this.state.color === 'yellow'){
          this.setState({
            color:'red'
          })
        }
        this.setState({
          currentTime: currentTime,
          currentTimeDisplay: this.formatTime(currentTime)
        });
        if (this.state.currentTime === 0) {
          this.stop();
        }
      }, 1000)
  }
  stop(){
    console.log('stop');
    this.setState({
      currentClockState: 'paused'
    })
    clearInterval(counter);
    
    if(this.state.currentTimeType === 'Session' && this.state.currentTime === 0){
      console.log('shit')
      // play sound
      // set state for break time
      this.setState({
          currentTimeType: 'Break',
          currentTime: this.state.breakTime*60000,
          currentTimeDisplay: this.formatTime(this.state.breakTime*60000),
          color:'yellow'
      });
      // start break
      this.start();
    }
  }
  startStopClock(){
    if(this.state.currentClockState === 'paused'){
        this.start()
    } else{
      this.stop()
    }
  }
  resetClock(){
    if (this.state.currentClockState === 'running') {
      this.stop();
    }
    this.setState({
      breakTime: 5,
      sessionTime:25,
      currentTimeType: 'Session',
      currentTime: 25*60000,
      currentTimeDisplay: this.formatTime(25*60000),
      color:'yellow'
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
        <div id="timer" style={{borderColor: `${this.state.color}`}}>
          <p style={{color: `${this.state.color}`}}>{this.state.currentTimeType}</p>
          <div style={{color: `${this.state.color}`}}>{this.state.currentTimeDisplay}</div>
        </div>
        <Controls startStopClock={this.startStopClock} resetClock={this.resetClock}/>
      </div>
    )
  }
}

export default Clock;