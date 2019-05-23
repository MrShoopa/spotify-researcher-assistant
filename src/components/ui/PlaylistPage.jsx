import React from 'react';
import * as jsonexport from 'jsonexport/dist';

import SpotifyDataHandler from '../api/SpotifyDataHandler';

import TrackTable from './Analytics/TrackTable'
import TrackScatterGraph from './Analytics/TrackScatterGraph'

// Component
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



        SpotifyDataHandler.fetchPlaylist(playlistID).then(async playlist => {
            // Filter JSON data
            const finalizedData = await new Promise((resolve, reject) => {

                let filteredData = (playlist.tracks.items.map((item) => {
                    //. console.log(item.track)
                    let audioFeatures = SpotifyDataHandler.fetchTrackData(item.track.id)

                    return {

                        //  Core track data
                        trackID: item.track.id,
                        albumName: item.track.album.name,
                        albumReleaseDate: item.track.album.release_date,
                        totalTracks: item.track.album.total_tracks,
                        trackName: item.track.name,
                        trackPopularity: item.track.popularity,
                        artist: item.track.artists.map(artist => {
                            return {
                                name: artist.name,
                                artistType: artist.type
                            }
                        }),

                        //  Audio Features
                        energy: audioFeatures.energy,
                        valence: audioFeatures.valence,
                        danceability: audioFeatures.danceability,
                        speechiness: audioFeatures.speechiness

                    }
                })
                )

                console.log(`Playlist's tracks data resolved`)
                resolve(filteredData)
            })


            //Convert filtered Json data to csv
            jsonexport(finalizedData, (err, csv) => {
                if (err) return console.log(err);

                console.log(`CSV file of playlist ${playlistID} created:`)
                console.log(csv)

                this.setState({
                    playlist: playlist,
                    playlistCsv: csv
                })
            })
        });
    }

    render() {
        const csvHref = `data:text/csv;charset=utf-8,${escape(this.state.playlistCsv)}`;

        return (
            <div style={styles} >
                <h1>This is your playlist's page!</h1>
                {this.props.children
                }
                < Button href={csvHref} download="playlist_data.csv" > Click to Download CSV file</Button >


            </div >
        );
    }
}

var styles = {
    textAlign: 'center',
    color: 'white'
}

export default PlaylistPage;

