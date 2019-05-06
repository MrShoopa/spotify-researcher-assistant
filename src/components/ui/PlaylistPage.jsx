import React from 'react';
import SpotifyDataAccessor from '../api/SpotifyDataAccessor';

class PlaylistPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playlist: null
        }
    }

    componentDidMount() {
        const playlistId = this.props.match.params.playlistId;
        SpotifyDataAccessor.fetchPlaylist(playlistId).then(data => {
            this.setState({ playlist: data })
        });
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

