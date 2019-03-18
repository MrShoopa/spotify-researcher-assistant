import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

import App from './App';

//  Retrieve access token beforehand
// ? Did not have enough time to implement authorization and access_token retreival,
// ? Using pre-fetched data: Spotify playlist data and user data.

//  Server-side authentication
//import './Auth.jsx';


/* 
Dependencies needed: 
    npm install:
    -axios
    -axios-retry
    -particlesjs
    -chart.js
    -react-chartjs-2
*/


ReactDOM.render(<App />, document.getElementById('root'));

// PWA
serviceWorker.register();
