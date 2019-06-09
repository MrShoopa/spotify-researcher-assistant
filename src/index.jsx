/*
    --- Playlist Spotter ---
    Web application that identifies user-specified Spotify playlists,
    and performs various functions with given data, such as but not,
    limited to:
        - Playlist Details (Artist/Title)
        - Track Audio Features display (Energy, valence, etc.)
        - Graphing of numeric data (Ex. Energy vs. Valence)
        - Recommending a playlist based on a user's playlist's values

    Originally written as a concept, with plans to go into production.

    Powered by the Spotify Web API (https://developer.spotify.com/web-api/)

    @author Joe Villegas (joev@uw.edu)
    @date   June 2019
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
