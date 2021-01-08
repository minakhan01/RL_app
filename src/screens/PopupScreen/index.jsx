import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import { store } from "../../redux";
import { useDispatch, useSelector } from 'react-redux'
import { BreakActions, PastActions } from "../../redux/actions";

var electron = window.require('electron');
var curWindow = electron.remote.getCurrentWindow();


const PopupScreen = () => {
    let dispatch = useDispatch()
    console.log('well we reached the popup pages')
    return (<div style={{ backgroundColor: 'white' }}>
        <div style={{ backgroundColor: 'white' }}>It's time to break!</div>
        <div style={{ backgroundColor: 'white' }}>Should we get started? This break will start automatically if you ignore this pop up</div>
        <div style={{ backgroundColor: 'white' }}><button onClick={() => dispatch(BreakActions.cancelBreak())}>CANCEL</button><button>CONTINUE</button></div>
        </div>)
}

export default PopupScreen;


