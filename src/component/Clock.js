// React dependencies
import React from 'react';
import TimeController from './TimeController'
import Controls from './Controls'

class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      breakTime: 5,
      sessionTime:25,
      currentTimeType: 'Session'
    }
    this.setTime = this.setTime.bind(this)
    this.changeBreakTime = this.changeBreakTime.bind(this)
    this.changeSessionTime = this.changeSessionTime.bind(this)
  }
  changeBreakTime(change){
    let time = this.state.breakTime+(change)
    if(time >= 1 && time <=60){
      this.setState({
        breakTime:time
      })
    }
  }
  changeSessionTime(change){
    let time = this.state.sessionTime+(change)
    if(time >= 1 && time <=60){
      this.setState({
        sessionTime:time
      })
    }
  }
  setTime(){
    return this.state.sessionTime+':00'
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
          <div>{this.setTime()}</div>
        </div>
        <Controls />
      </div>
    )
  }
}

export default Clock;