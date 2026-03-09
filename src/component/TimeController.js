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
	}
	render(){
		return(
			<div className="time-choice">
			  <div>{this.props.title}</div>
			  <div className="time-setter">
			  	<FontAwesomeIcon icon="fa-solid fa-minus" />
			  	{this.props.time}
			  	<FontAwesomeIcon icon="fa-solid fa-plus" />
			  </div>
			</div>
		)
	}
}

export default TimeController;