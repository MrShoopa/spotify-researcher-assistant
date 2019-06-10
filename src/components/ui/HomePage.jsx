/* 
    The initial screen of the app;
    Here the user can input a playlist ID from Spotify,
    then submit to retrieve information about that playlist's tracks.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu)
    @date       4/20/19
*/

import React from 'react'
import { Dropdown, Button } from 'react-bootstrap'
import SpotifyDataHandler from '../api/SpotifyDataHandler'

//  Internal Components
import './HomePage.scss'

import logo from '../../logo.svg'

export default class HomePage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            playlistID: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        // Start loading available playlists of user on page load.

        //TODO: Fix not loading on first load.
        var playlistData = async () => {
            let playlists = await SpotifyDataHandler.fetchPlaylists();

            this.setState(() => {
                return { playlists: playlists }
            });
        }
        await playlistData()
    }

    redirectToPlaylist = () => {
        this.props.history.push({ pathname: this.props.scope + '/playlist/' + this.state.playlistID })
    }

    handleChange(event) {
        // Fetches playlist ID on playlist select
        this.setState({ playlistID: event.target.value });
    }

    handleSubmit(event) {
        // Fetches playlist ID on playlist ID input
        event.preventDefault();
        this.redirectToPlaylist();
    }

    render = () => {
        // Renders dropdown of user's playlist when loaded
        var dropdownPlaylists = this.state.playlists ?
            this.state.playlists.map(playlist => {
                return (<Button className='btn-block'
                    key={playlist.id + '-key'} href={`${this.props.scope}playlist/${playlist.id}`}
                >
                    {playlist.name}</Button>)
            })
            : 'Loading playlists'   //  Loading...

        //  Renders home page.
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
                        <input type="text" value={this.state.playlistID} name="playlistID"
                            onChange={this.handleChange} placeholder="Playlist ID" required />
                        <br />
                        <Dropdown id="dropdown-playlist" className='fill-style'>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className='fill-style'>
                                Select one of your playlists
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fill-style' style={DropdownMenuStyle} >
                                {dropdownPlaylists}
                            </Dropdown.Menu>
                        </Dropdown>
                        <br />
                        <input type="submit" value="Get the Facts" />
                    </form>
                </div>
            </div >
        );
    }
}

/* Component Styles */

var DropdownMenuStyle = {

    overflow: 'auto',
    height: '50vh'

}
