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
		const timeChangeType = e.target.id.split('-')[1]; 
		console.log(timeChangeType)
		const timeChange = timeChangeType === 'decrement' ? -1 : 1;
		const type = this.props.title.split(' ')[0];
		this.props.changeTime(timeChange, type)
	}

	render(){
		return(
			<div className="time-choice">
			  <div id={this.props.title.split(' ')[0].toLowerCase()+'-label'}>{this.props.title}</div>
			  <div className="time-setter">
			  	<div id={this.props.title.split(' ')[0].toLowerCase()+'-decrement'} className="time-change" onClick={this.incOrDecTime}><FontAwesomeIcon style={{pointerEvents: 'none'}} icon="fa-solid fa-minus" /></div>
			  	<div id={this.props.title.split(' ')[0].toLowerCase()+'-length'}>{this.props.time}</div>
			  	<div id={this.props.title.split(' ')[0].toLowerCase()+'-increment'} className="time-change" onClick={this.incOrDecTime}><FontAwesomeIcon style={{pointerEvents: 'none'}} icon="fa-solid fa-plus" /></div>
			  </div>
			</div>
		)
	}
}

export default TimeController;