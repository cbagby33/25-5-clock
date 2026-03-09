// React dependencies
import React from 'react';
import TimeController from './TimeController'
import Controls from './Controls'

class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      time: 1,
      currentTimeType: 'Session'
    }
    this.setTime = this.setTime.bind(this)
  }
  setTime(){
    return this.state.time+':00'
  }
  render(){
    return(
      <div id="clock">
        <div id="title">Interval clock</div>
        <div id="time-settings">
          <TimeController title="Break Time" time="5" />
          <TimeController title="Session Time" time={this.state.time} />
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