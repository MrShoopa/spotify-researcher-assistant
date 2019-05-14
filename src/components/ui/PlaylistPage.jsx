import React from 'react';
import SpotifyDataAccessor from '../api/SpotifyDataAccessor';
import * as jsonexport from 'jsonexport/dist';


class PlaylistPage extends React.Component {
    dataAccessor = new SpotifyDataAccessor()

    constructor(props) {
        super(props)

        this.state = {
            playlist: null,
            playlistCsv: null
        }
    }

    componentDidMount() {
        const playlist_id = this.props.match.params.playlistId;
        this.dataAccessor.fetchPlaylist(playlist_id).then(data => {

            //Convert Json to csv
            jsonexport(data, (err, csv) => {
                if (err) return console.log(err);
                console.log(csv)
                this.setState({
                    playlist: data,
                    playlistCsv: csv
                })
            })
        });
    }

    render() {
        const href = `data:text/csv;charset=utf-8,${escape(this.state.playlistCsv)}`;

        return (
            <div>
                <h1>This is a playlist page</h1>
                <a href={href} download="filename.csv">Click to Download CSV file</a>
            </div >
        );
    }
}

export default PlaylistPage;

