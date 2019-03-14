import React from 'react';
import logo from './logo.svg';
import './App.css';

import SpotifyDataHandler from './components/CanvasDataHandler'

class App extends React.Component {




  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <body>
          <p>
            Hi! I'm your Spotify Researcher.
          </p>
          <p class="hint-headline">
            Input a playlist and user ID to learn a little more about your music.
          </p>
          <form class='user-form' action={this.SpotifyDataHandler.authenticate()} >
            <input type="text" name="user-id" placeholder="User ID" />
            <br></br>
            <input type="text" name="playlist-id" placeholder="Playlist ID" />
            <br></br>
            <input type="submit" value="Get the Facts" />
          </form>

        </body>
        <SpotifyDataHandler onRef={ref => (this.CanvasDataHandler = ref)} />
      </div>
    );
  }
}

export default App;
