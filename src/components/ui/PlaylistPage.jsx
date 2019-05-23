import React from 'react';
import * as jsonexport from 'jsonexport/dist';

import SpotifyDataHandler from '../api/SpotifyDataHandler';

import TrackTable from './Analytics/TrackTable'
import TrackScatterGraph from './Analytics/TrackScatterGraph'
import PlaylistRecommendation from './Recommendation/PlaylistRecommendationTable'

// Component
import { Button } from 'react-bootstrap';

class PlaylistPage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            playlist: null,
            playlistCsv: null,

            energyAverage: 0,
            valenceAverage: 0,
            topArtistID: 0,
            bestTrackPopularity: 100

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
            const finalizedData = await new Promise(async (resolve, reject) => {

                let filteredData = playlist.tracks.items.map(async (item, index) => {
                    //.console.log(item.track)
                    let audioFeatures = await SpotifyDataHandler.fetchTrackData(item.track.id)

                    //  Calculating averages
                    this.setState((state) => ({
                        energyAverage: (state.energyAverage + audioFeatures.energy) / (index + 1),
                        valenceAverage: (state.valenceAverage + audioFeatures.valence) / (index + 1)
                    }))

                    return {

                        //  Core track data
                        trackID: item.track.id,
                        albumName: item.track.album.name,
                        albumReleaseDate: item.track.album.release_date,
                        totalTracks: item.track.album.total_tracks,
                        trackName: item.track.name,
                        trackPopularity: item.track.popularity,
                        artist: item.track.artists.map(artist => {
                            if (item.track.popularity < this.state.bestTrackPopularity)
                                this.state.topArtistID = item.track.artist
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

                const results = await Promise.all(filteredData)

                console.log(`Playlist's tracks' data resolved`)
                console.log(results)
                resolve(results)
            })

            //TODO: Verify results, fetch top artist's ID
            console.log(
                `Best artist's ID: ${this.state.topArtistID}
                \nAverage valence:${this.state.valenceAverage}
                \nAverage energy:${this.state.energyAverage}`)

            //Convert filtered Json data to csv
            jsonexport(finalizedData, (err, csv) => {
                if (err) return console.log(err);

                console.log(`CSV file of playlist ${playlistID} created.`)
                //.console.log(csv)

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
                <Button href={csvHref}
                    download="playlist_data.csv"
                    variant='dark'>
                    Click to Download CSV file
                </Button >

                {/* //TODO: Add playlist recommendation based off Spotify API's Recommendation Query  */}
                <Button onClick={this.setRecommendedPlaylistVisible}
                    style={{ color: 'white', backgroundColor: 'darkslategray' }}
                >
                    What would you recommend me?
                </Button >

                <PlaylistRecommendation
                    energyAverage={this.state.energyAverage}
                    valenceAverage={this.state.valenceAverage}
                    artistPopular={this.state.topArtistID}
                    style={{ display: 'none' }}>
                </PlaylistRecommendation>
            </div >
        );
    }

    setRecommendedPlaylistVisible = () => {

    }
}

var styles = {
    textAlign: 'center',
    color: 'white'
}

export default PlaylistPage;

