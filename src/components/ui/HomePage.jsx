/* 
    The initial screen of the app;
    Here the user can input a playlist/user ID combo and submit to
    retrieve information about that playlist's tracks.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu)
    @date       4/20/19
*/

import React from 'react'

//  Internal Components
import logo from '../../logo.svg'
import './HomePage.scss'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { playlist_id: '' }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    redirectToPlaylist = () => {
        this.props.history.push({ pathname: '/playlist/' + this.state.playlist_id })
    }

    handleChange(event) {
        this.setState({ playlist_id: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.redirectToPlaylist();
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
                            <br />
                        </p>
                    </div>

                    <form className='user-form' onSubmit={this.handleSubmit}>
                        <br />
                        <input type="text" value={this.state.playlist_id} name="playlist_id" onChange={this.handleChange} placeholder="Playlist ID" required />
                        <br />
                        <input type="submit" value="Get the Facts" />
                    </form>
                </div>
            </div >
        );
    }
}

export default HomePage;
