import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

import App from './App';

//  Retrieve access token beforehand
// ? Did not have enough time to implement authorization and access_token retreival,
// ? Using pre-fetched data.
//  import './Auth.jsx';


/* 
Dependencies needed: 
    npm install:
    -axios
    -axios-retry
    -particlesjs
    -chart.js

*/
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
