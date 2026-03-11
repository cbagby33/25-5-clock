// React dependencies
import React from 'react';

// Font Awesome dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab) // add library of icons 

class Controls extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id="controls">
        <div id="start_stop" onClick={this.props.startStopClock}>
            <FontAwesomeIcon icon="fa-solid fa-play" />
            <FontAwesomeIcon id="pause" icon="fa-solid fa-pause" />
        </div>
        <FontAwesomeIcon id="reset" onClick={this.props.resetClock} icon="fa-solid fa-arrow-rotate-left" />
      </div>
    )
  }
}

export default Controls;