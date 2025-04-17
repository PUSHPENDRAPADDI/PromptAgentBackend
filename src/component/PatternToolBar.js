import React from 'react';
import './PatternToolBar.css';
import start from '../assets/start.png';
import stop from '../assets/stop.png';
import away from '../assets/away.png';
import towords from '../assets/towords.png';
import rect from '../assets/rectangle.png';

const PatternToolBar = () => {
    const handleIconClick = (iconName) => {
        alert(`${iconName} icon clicked!`);
    };

    return (
        <div className="pattern-toolbar">
            <img src={start} alt='start' className='tool-img' />
            <img src={stop} alt='end' className='tool-img' />
            <img src={away} alt='start' className='tool-img' />
            <img src={towords} alt='start' className='tool-img' />
            <img src={rect} alt='start' className='tool-img' />
         </div>
    );
};

export default PatternToolBar;
