import './App.css';

// React dependencies
import React from 'react';

// Font Awesome dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab) // add library of icons 

function App() {
  return (
    <div className="App">
      <div id="title">Interval clock</div>
      <div id="time-choices">
        <div className="time-choice">
          <div>Break Time</div>
          <div className="time-setter"><FontAwesomeIcon icon="fa-solid fa-minus" />5<FontAwesomeIcon icon="fa-solid fa-plus" /></div>
        </div>
        <div className="time-choice">
          <div>Session Time</div>
          <div className="time-setter"><FontAwesomeIcon icon="fa-solid fa-minus" />25<FontAwesomeIcon icon="fa-solid fa-plus" /></div>
        </div>
      </div>
      <div id="timer">25:00</div>
      <div id="controls"><FontAwesomeIcon icon="fa-solid fa-play" /><FontAwesomeIcon icon="fa-solid fa-pause" /><FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" /></div>
      
    </div>
  );
}

export default App;
