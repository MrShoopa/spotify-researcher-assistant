/* 
    The initial screen of the app;
    Here the user can input a playlist/user ID combo and submit to
    retrieve information about that playlist's tracks.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu)
    @date       4/20/19
*/

import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Particles from 'particlesjs'
import HomePage from './components/ui/HomePage';
import LoginPage from './components/ui/LoginPage';
import PlaylistPage from './components/ui/PlaylistPage';
import TrackAnalysis from './components/ui/TrackAnalysis';
import SpotifyDataAccessor from './components/api/SpotifyDataAccessor';
import SpotifyDataHandler from './components/api/SpotifyDataHandler';

function Callback() {
  const urlParams = new URLSearchParams(window.location.hash.replace(/#/, ''));
  let token = urlParams.get('access_token');

  if (token) {
    SpotifyDataHandler.setAccessToken(token)  //  Set user token throughout app

    //TODO: Retrieve track data

    let playlist_id = '37i9dQZEVXcFbAqSiwWlsc'

    return <Redirect to={`/playlist/${playlist_id}`} />
  } else
    return <Redirect to='/login' />
}

class App extends React.Component {
  render() {
    // Load background (ParticlesJS)
    window.onload = function () {
      Particles.init({
        selector: '.background-particles'
      });
    };

    return (
      <Router>
        <canvas className="background-particles"></canvas>
        <script src={Particles}></script>

        <Route path='/' exact component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/callback' exact component={Callback} />
        <Route path='/playlist/:playlistId' component={PlaylistPage} />
      </Router>
    );
  }
}

export default App;
