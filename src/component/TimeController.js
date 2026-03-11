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
		this.incOrDecTime = this.incOrDecTime.bind(this)
	}

	// function to change duration of break/session
	incOrDecTime(e){
		const timeChange = e.target.id === 'decrement' ? -1 : 1;
		const type = this.props.title.split(' ')[0];
		this.props.changeTime(timeChange, type)
	}
	
	render(){
		return(
			<div className="time-choice">
			  <div>{this.props.title}</div>
			  <div className="time-setter">
			  	<span onClick={this.incOrDecTime}><FontAwesomeIcon id="decrement" icon="fa-solid fa-minus" /></span>
			  		{this.props.time}
			  	<span onClick={this.incOrDecTime}><FontAwesomeIcon id="increment" icon="fa-solid fa-plus" /></span>
			  </div>
			</div>
		)
	}
}

export default TimeController;