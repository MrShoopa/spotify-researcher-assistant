/* 
    The initial screen of the app;
    Here the user can input a playlist/user ID combo and submit to
    retrieve information about that playlist's tracks.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu), Chhoden Gurung
    @date       4/20/19
*/

import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Particles from 'particlesjs'

import HomePage from './components/ui/HomePage';
import LoginPage from './components/ui/LoginPage';
import PlaylistPage from './components/ui/PlaylistPage';
import TrackAnalysis from './components/ui/_depreicated/TrackAnalysis';

//*  Debugging on local server
export const _localhost = false

//* Change only if hosting elsewhere!
var baseURL = '/spotify-researcher-assistant/'


//Retrieve access_token and redirect it to playlistPage
function Callback() {
  const urlParams = new URLSearchParams(window.location.hash.replace(/#/, ''));
  let token = urlParams.get('access_token');

  if (token) {
    //Storing the accessToken of current session
    sessionStorage.setItem('token', token);
    return <Redirect to='/home' />;
  } else {
    return <Redirect to='/login' />;
  }
}

class App extends React.Component {
  constructor () {
    super()

    if (_localhost === true)
      baseURL = ''
  }


  render() {
    // Load background (ParticlesJS)
    window.onload = function () {
      Particles.init({
        selector: '.background-particles'
      });
    };

    return (
      <Router basename={baseURL}>
        <canvas className="background-particles"></canvas>
        <script src={Particles}></script>
        <Route path='/' exact component={LoginPage} />
        <Route path='/home' component={HomePage} />
        <Route path='/callback' exact component={Callback} />
        <Route path='/playlist/:playlistId' component={PlaylistPage} />
        <Route path='/sample-playlist-visual' component={TrackAnalysis} />
      </Router>
    );
  }
}

export default App;
