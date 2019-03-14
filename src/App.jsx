import React from 'react';

//  Internal Components
import logo from './logo.svg';
import './App.css';

//  External Components
import SpotifyDataHandler from './components/api/SpotifyDataHandler'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.formAuthenticate = this.formAuthenticate.bind(this)
  }

  formAuthenticate = (event) => {
    this.SpotifyDataHandler.authenticate();
    event.preventDefault()
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <p>
            Hi! I'm your Spotify Researcher.
          </p>
          <p className="hint-headline">
            Input a playlist and user ID to learn a little more about your music.
          </p>
          <form className='user-form' onSubmit={this.formAuthenticate} >
            <input type="text" name="user-id" placeholder="User ID" />
            <br></br>
            <input type="text" name="playlist-id" placeholder="Playlist ID" />
            <br></br>
            <input type="submit" value="Get the Facts" />
          </form>

        </div>
        <SpotifyDataHandler onRef={ref => (this.SpotifyDataHandler = ref)} />
      </div>
    );
  }
}

export default App;
