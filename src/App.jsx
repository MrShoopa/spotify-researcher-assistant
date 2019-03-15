import React from 'react'

//  Internal Components
import logo from './logo.svg'
import './App.css'
import Particles from 'particlesjs'

//  External Components
import SpotifyDataHandler from './components/api/SpotifyDataHandler'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.formAuthenticate = this.formAuthenticate.bind(this)
  }

  formAuthenticate = (event) => {

    this.SpotifyDataHandler.authenticate()
    event.preventDefault()
  }

  render = () => {

    // Load background
    window.onload = function () {
      Particles.init({
        selector: '.background-particles'
      });
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className='App-body'>
          <div className="body-text">
            <p className="hello-headline">
              <b>Hi! I'm your Spotify Researcher.</b>
            </p>
            <p className="hint-headline">
              Input a playlist and user ID to learn a little more about your music.
            </p>
          </div>

          <form className='user-form' onSubmit={this.formAuthenticate}>
            <input type="text" name="user-id" placeholder="User ID" required />
            <br></br>
            <input type="text" name="playlist-id" placeholder="Playlist ID" required />
            <br></br>
            <input type="submit" value="Get the Facts" />
          </form>

          <canvas className="background-particles"></canvas>
          <script src={Particles}></script>
        </div>
        <SpotifyDataHandler onRef={ref => (this.SpotifyDataHandler = ref)} />
      </div>
    );
  }
}

export default App;
