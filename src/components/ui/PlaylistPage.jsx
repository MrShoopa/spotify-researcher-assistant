import React from 'react';
import SpotifyDataHandler from '../api/SpotifyDataHandler';

class PlaylistPage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            playlist: null
        }
    }

    componentDidMount() {
        const playlistId = this.props.match.params.playlistId;

        switch (playlistId) {
            case 'Discover Weekly':
                SpotifyDataHandler.fetchPlaylist(playlistId).then(data => {
                    this.setState({ playlist: data })
                });
                break
            default:
                SpotifyDataHandler.fetchPlaylist(playlistId).then(data => {
                    this.setState({ playlist: data })
                });
        }
    }

    render() {
        return (
            <div>
                <h1>ID is {this.props.match.params.playlistId}</h1>
                {JSON.stringify(this.state.playlist, null, 2)}
            </div>
        );
    }

}

export default PlaylistPage;

