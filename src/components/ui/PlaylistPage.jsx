import React from 'react';
import SpotifyDataHandler from '../api/SpotifyDataHandler';
//import SpotifyDataAccessor from '../api/SpotifyDataAccessor';
import * as jsonexport from 'jsonexport/dist';

import { Button } from 'react-bootstrap';


class PlaylistPage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            playlist: null,
            playlistCsv: null
        }
    }

    componentDidMount() {
        let playlistID = this.props.match.params.playlistId;
        switch (playlistID) {
            case 'Discover Weekly':
                playlistID = 'discover_weekly_placeholder'
                // TODO: Regex search Discover Weekly using DataHandler
                break;
            default:
                break;
        }

        SpotifyDataHandler.fetchPlaylist(playlistID).then(data => {

            //Convert Json to csv
            jsonexport(data, (err, csv) => {
                if (err) return console.log(err);

                console.log(`CSV file of playlist ${playlistID} created:`)
                console.log(csv)

                this.setState({
                    playlist: data,
                    playlistCsv: csv
                })
            })
        });
    }

    render() {
        const csv_href = `data:text/csv;charset=utf-8,${escape(this.state.playlistCsv)}`;

        return (
            <div style={styles}>
                <h1>This is your playlist's page!</h1>
                {this.props.children}
                <Button href={csv_href} download="playlist_data.csv">Click to Download CSV file</Button>
            </div >
        );
    }
}

var styles = {
    textAlign: 'center',
    color: 'white'
}

export default PlaylistPage;

