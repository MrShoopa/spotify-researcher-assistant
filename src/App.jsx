/* 
    The initial screen of the app;
    Here the user can input a playlist/user ID combo and submit to
    retrieve information about that playlist's tracks.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu)
    @date       4/20/19
*/

import React from 'react'
import ReactDOM from 'react-dom'

//  Internal Components
import logo from './logo.svg'
import './App.css'
import Particles from 'particlesjs'

//  External Components
import SpotifyDataHandler from './components/api/SpotifyDataHandler'
import TrackAnalysis from './components/ui/TrackAnalysis'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.formAuthenticate = this.formAuthenticate.bind(this)
  }

  formAuthenticate = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    try {
      await this.SpotifyDataHandler.authenticate()
      document.getElementById('hint-headline').innerHTML
        = "Reading playlist..."
    } catch {
      document.getElementById('hint-headline').innerHTML
        = "There seems to be an issue connecting with Spotify. Try again later."
      return;
    }

    await this.SpotifyDataHandler.setState({ user: data.user_id, playlist: data.playlist_id })

    this.generatePlaylistAnalytics()
  }

  generatePlaylistAnalytics = () => {

    //let track_data = this.SpotifyDataHandler.fetchTrackData()       //  PRODUCTION

    let track_data = this.SpotifyDataHandler.fetchTrackData('sample') //  DEBUG

    ReactDOM.render(<TrackAnalysis track_data={track_data} />,
      document.getElementById('root'))
  }

  render = () => {

    // Load background (ParticlesJS)
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

          <div className="body-text" style={{ animation: 'text-slide-up-empty-full 1s' }}>
            <p className="hello-headline" id="hello-headline">
              <b>Hi! I'm your Spotify Researcher.</b>
            </p>
            <p className="hint-headline" id="hint-headline" style={{ animationDelay: '2s' }}>
              Input a playlist and user ID to learn a little more about your music.
              <br></br>
              <br></br>
              <i>Disclaimer: Unfortunately, fetching playlists is unavailable at the moment so a sample playlist will be used.</i>
            </p>
          </div>

          <form className='user-form' onSubmit={this.formAuthenticate}>
            <input type="text" name="user_id" placeholder="User ID" required />
            <br></br>
            <input type="text" name="playlist_id" placeholder="Playlist ID" required />
            <br></br>
            <input type="submit" value="Get the Facts" />
          </form>

          <canvas className="background-particles"></canvas>
          <script src={Particles}></script>
        </div>

        <SpotifyDataHandler onRef={ref => (this.SpotifyDataHandler = ref)} />

      </div >
    );
  }
}

export default App;
