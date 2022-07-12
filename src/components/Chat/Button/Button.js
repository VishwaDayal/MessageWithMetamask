import React from 'react'
import { useState } from 'react';

import classes from './Button.module.css'


const Button = () => {
    const [message, setMessage] = useState('');
    let text;
    const onClick = (e) => {
        console.log('blablabla');
        console.log(message);
    }
    const handleChange = event => {
        setMessage(event.target.value);
        // text = event.target.value;
        console.log('value is:', message);
    };
    return (
        <div>
            <button className={classes.btn} onClick={onClick} onChange={handleChange} value={message}>Send</button>
            <h1>{message}</h1>
        </div>
    )
}

export default Button