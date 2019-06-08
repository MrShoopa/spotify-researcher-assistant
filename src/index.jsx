/*
    Playlist Spotter
    A web application designed to analyze Spotify playlists
    and perform various functions with them
    such as playlist data analysis, recommendation, and visualizaitons.

    @author Joe Villegas (joev@uw.edu)
    @date   June 8th, 2019
*/

// Loads the basis of the entire web application.

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

//  Server-side authentication
//import './Auth.jsx';

/* 
Dependencies needed: 
    npm install:
    -axios
    -particlesjs
    -chart.js
    -react-chartjs-2
*/


// Renders the basis of the application.
ReactDOM.render(<App />, document.getElementById('root'));

// For enabling local data caching and offline/mobile app use.
// Progressive Web Application
serviceWorker.register();
