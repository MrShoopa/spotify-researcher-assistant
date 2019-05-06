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
import { Redirect } from "react-router-dom";

//  Internal Components
import logo from '../../logo.svg'
import '../../App.css'

//  External Components
import SpotifyDataHandler from '../api/SpotifyDataHandler'
import TrackAnalysis from './TrackAnalysis'

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.formAuthenticate = this.formAuthenticate.bind(this)
    }

    formAuthenticate = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        console.log(event);

        console.log(data);

        // if (data) {
        //     // redirect to playlist page
        //     this.props.history.push(`/playlist/${data.playlist_id}`);
        // }
    }

    render = () => {

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
                            Input a playlist ID to learn a little more about your music.
              <br></br>
                        </p>
                    </div>

                    <form className='user-form' onSubmit={this.formAuthenticate}>
                        <input type="text" name="user_id" placeholder="User ID" required />
                        <br></br>
                        <input type="text" name="playlist_id" placeholder="Playlist ID" required />
                        <br></br>
                        <input type="submit" value="Get the Facts" />
                    </form>
                </div>

            </div >
        );
    }
}

export default HomePage;
