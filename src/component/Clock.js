// React dependencies
import React from 'react';
import TimeController from './TimeController'
import Controls from './Controls'

// Counter for clock interval
let counter = null;

// define beep sound
const beep = document.getElementById('beep')

// Clock component
class Clock extends React.Component {
  constructor(props){
    super(props)
    // Clock component state defaults
    this.state ={
      breakTime: 5, // default countdown time for break
      sessionTime:25, // default countdown time for session
      currentTimeType: 'Session', // Session or Break time
      currentTime: this.getMilliseconds(25), // current time in milliseconds
      currentTimeDisplay: this.formatTime(this.getMilliseconds(25)), // current time displayed on clock; used
      currentClockState: 'paused', // running or paused
      color:'yellow', // color of clock
      isFirstRun:true
    }

    // methods that will be passed to child components
    this.changeTimeAmount = this.changeTimeAmount.bind(this)
    this.startStopClock = this.startStopClock.bind(this)
    this.resetClock = this.resetClock.bind(this)
  }

  // Function used to change the duration of time in session/break
  changeTimeAmount(change, type){
    // Only change if clock not running
    if (this.state.currentClockState === 'paused') {
      // change is +1 or -1
      // set new time based on incrementing or decrementing time
      // anad change time of corresponding type   
      let time = this.state[type.toLowerCase()+'Time']+(change);
      let newTimeState = {};
      newTimeState[type.toLowerCase()+'Time'] = time;
      // only allow time to be set between 1 and 60 
      if(time >= 1 && time <=60){
        this.setState(newTimeState);
        if (this.state.currentTimeType === type) {
          this.setState({
            currentTime: this.getMilliseconds(time),
            currentTimeDisplay: this.formatTime(this.getMilliseconds(time))    
          })
          if(this.state.color === "red"){
            this.state.color = 'yellow'
          }
        }
      }
    }
  }
  
  // function used to handle clock actions while clock is running
  start(){
    // if this is first time clock is running, add ended event listener
    if (this.state.isFirstRun) {
      beep.addEventListener('ended', () => {
          // once sound is over, reset sound 
          beep.currentTime = 0;
      });
      this.setState({isFirstRun: false});
    }
    // change clock state to running
    this.setState({
      currentClockState: 'running'
    })
    // set interval for countdown
    counter = setInterval(() => {
        // update current time every second
        let currentTime = this.state.currentTime - 1000
        if(currentTime < this.getMilliseconds(1) && this.state.color === 'yellow'){ // change clock to red when time is under a min
          this.setState({
            color:'red'
          })
        }
        this.setState({
          currentTime: currentTime,
          currentTimeDisplay: this.formatTime(currentTime)
        });
        // stop clock at 0
        if (this.state.currentTime === 0) {
          this.stop();
        }
      }, 1000)
  }
  // function used to handle clock action while clock is stopped
  stop(){
    // clear countdown interval
    clearInterval(counter);
    this.setState({
      currentClockState: 'paused'
    })
    // if current clock is for Session, and Session is over, change to break time clock
    // otherwise do the opposite
    if(this.state.currentTime === 0){
      // play sound
      beep.play();

      // set next state for clock 
      let nextState = {
        color: 'yellow'
      };
      nextState['currentTimeType'] = this.state.currentTimeType === 'Session' ? 'Break' : 'Session';
      let currentTimeTypeProp = nextState['currentTimeType'].toLowerCase()+'Time';
      nextState['currentTime'] = this.getMilliseconds(this.state[currentTimeTypeProp]);
      nextState['currentTimeDisplay'] = this.formatTime(nextState['currentTime']);  
      this.setState(nextState);
      
      // start break
      this.start();
    }
  }
  // function passed to controls to manage when clock should start and stop
  startStopClock(){
    if(this.state.currentClockState === 'paused'){
        this.start()
    } else{
      this.stop()
    }
  }
  // function passed to controls to reset clock to defaults
  resetClock(){
    if (this.state.currentClockState === 'running') {
      this.stop();
    }
    if (beep.currentTime !== 0) {
      beep.currentTime = 0;
    }
    this.setState({
      breakTime: 5,
      sessionTime:25,
      currentTimeType: 'Session',
      currentTime: this.getMilliseconds(25),
      currentTimeDisplay: this.formatTime(this.getMilliseconds(25)),
      color:'yellow'
    })
  }
  // function to turn minutes into milliseconds
  getMilliseconds(time){
    return time*60000
  }

  // function is used to format current time to MM:SS for clock display
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
          <TimeController changeTime={this.changeTimeAmount} title="Break Time" time={this.state.breakTime} />
          <TimeController changeTime={this.changeTimeAmount} title="Session Time" time={this.state.sessionTime} />
        </div>
        <div id="timer" style={{borderColor: `${this.state.color}`}}>
          <p style={{color: `${this.state.color}`}}>{this.state.currentTimeType}</p>
          <div style={{color: `${this.state.color}`}}>{this.state.currentTimeDisplay}</div>
        </div>
        <Controls startStopClock={this.startStopClock} resetClock={this.resetClock}/>
        <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    )
  }
}

export default Clock;