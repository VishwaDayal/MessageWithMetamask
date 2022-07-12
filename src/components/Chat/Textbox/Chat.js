import React from 'react'
import Card from '../../UI/Card/Card'
// import Button from '../Button/Button'
import { useState } from 'react';
import { bufferToHex } from 'ethereumjs-util';
import { encrypt } from '@metamask/eth-sig-util';

import classes from './Chat.module.css'

const Chat = (props) => {
    const [message, setMessage] = useState('');
    const [receiverPublicKey, setreceiverPublicKey] = useState('');
    let publicKeyBuffer;
    // const [yourPublicKey, setYourPublicKey] = u  seState('');
    // setYourPublicKey(props.key);
    const onClick = async (e) => {
        // console.log('blablabla');
        // console.log(message);
        // console.log('Receviers public key', receiverPublicKey);
        publicKeyBuffer = Buffer.from(receiverPublicKey, 'base64');
        const encryptedMessage = bufferToHex(
            Buffer.from(
                JSON.stringify(
                    encrypt({
                        publicKey: receiverPublicKey,
                        data: message,
                        version: 'x25519-xsalsa20-poly1305',
                    })
                ),
                'utf8'
            )
        );
        console.log('encryptedMessage : ', encryptedMessage);
    }
    // const getPublicKey = async (e) => {
    //     setYourPublicKey(props.key)
    // }
    const getMessage = event => {
        setMessage(event.target.value);
        // console.log('Message is:', message);
    };
    const getreceiverPublicKey = event => {
        setreceiverPublicKey(event.target.value);
        // console.log('Wallet address is :', message);
    };
    return (
        <>
            <Card className={classes.chat}>
                {/* <h1>Your public key is : {props.key}</h1> */}
                <input type="text" placeholder="Type receiver's public key" onChange={getreceiverPublicKey} value={receiverPublicKey} />
                <input type="text" placeholder="Type your message" onChange={getMessage} value={message} />
                <button className={classes.btn} onClick={onClick}>Send</button>
                {/* <button className={classes.btn} onClick={getPublicKey}>Get your public key</button> */}
                {/* <h1>{yourPublicKey}</h1> */}
                {/* <Button></Button> */}
            </Card>
            <div>

            </div>
        </>

    )
}

export default Chat