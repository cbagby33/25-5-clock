// React dependencies
import React from 'react';

// Font Awesome dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab) // add library of icons 
class TimeController extends React.Component {
	constructor(props){
		super(props)
		this.decrement = this.decrement.bind(this)
		this.increment = this.increment.bind(this)
	}
	decrement(){
		this.props.changeTime(-1)
	}
	increment(){
		this.props.changeTime(1)
	}
	render(){
		return(
			<div className="time-choice">
			  <div>{this.props.title}</div>
			  <div className="time-setter">
			  	<span onClick={this.decrement}><FontAwesomeIcon icon="fa-solid fa-minus" /></span>
			  		{this.props.time}
			  	<span onClick={this.increment}><FontAwesomeIcon icon="fa-solid fa-plus" /></span>
			  </div>
			</div>
		)
	}
}

export default TimeController;