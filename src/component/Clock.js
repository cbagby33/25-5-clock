// React dependencies
import React from 'react';
import TimeController from './TimeController'
import Controls from './Controls'

// Font Awesome dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab) // add library of icons 
class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      time: '25:00'
    }
  }
  render(){
    return(
      <div id="clock">
        <div id="title">Interval clock</div>
        <div id="time-settings">
          <TimeController title="Break Time" time="5" />
          <TimeController title="Session Time" time="25" />
        </div>
        <div id="timer">{this.state.time}</div>
        <Controls />
      </div>
    )
  }
}

export default Clock;