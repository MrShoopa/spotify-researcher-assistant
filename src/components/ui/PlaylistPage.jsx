import React from 'react';
import * as jsonexport from 'jsonexport/dist';

import SpotifyDataHandler from '../api/SpotifyDataHandler';

//import TrackTable from './Analytics/TrackTable'
//import TrackScatterGraph from './Analytics/TrackScatterGraph'
import PlaylistRecommendation from './Recommendation/PlaylistRecommendationTable'

// Component
import { Button } from 'react-bootstrap';
let playlistComponent

class PlaylistPage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            playlist: null,
            playlistCsv: null,

            //  Number values
            energyAverage: null,
            valenceAverage: null,
            topArtistID: null,
            bestTrackPopularity: null

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
            this.setState(() => ({ sourcePlaylist: playlist }))

            // Filter JSON data
            const finalizedData = await new Promise(async (resolve, reject) => {

                //  Total audio values
                let energyTotal = 0, valenceTotal = 0

                let filteredData = playlist.tracks.items.map(async (item, index) => {
                    //.console.log(item.track)
                    let audioFeatures = await SpotifyDataHandler.fetchTrackData(item.track.id)

                    energyTotal += audioFeatures.energy
                    valenceTotal += audioFeatures.valence


                    //  Calculating averages
                    if (index === playlist.tracks.items.length - 1)
                        this.setState(() => ({
                            energyAverage: (energyTotal / filteredData.length),
                            valenceAverage: (valenceTotal / filteredData.length)
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
                            if (item.track.popularity > this.state.bestTrackPopularity) {
                                this.setState({ bestTrackPopularity: item.track.popularity })
                                this.state.topArtistID = artist.id
                            }
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

            console.log(
                `Best artist's ID: ${this.state.topArtistID}
                \nAverage valence: ${this.state.valenceAverage}
                \nAverage energy: ${this.state.energyAverage}`)

            if (this.state.energyAverage)
                playlistComponent = (
                    <PlaylistRecommendation
                        energyAverage={this.state.energyAverage}
                        valenceAverage={this.state.valenceAverage}
                        topArtistID={this.state.topArtistID}>
                    </PlaylistRecommendation>)
            else
                playlistComponent = (<p>Loading recommendations...</p>)

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
        const csvHref = `data:text/csv;charset=utf-8,${escape(this.state.playlistCsv)}`
        let sourcePlaylistDataDownloadBtn, recommendedPlaylistTableDisplayBtn

        //TODO: Include graphing visuals (plug in TrackScatterGraph)
        if (this.state.sourcePlaylist)
            sourcePlaylistDataDownloadBtn = (
                <Button href={csvHref}
                    download="playlist_data.csv"
                    variant='dark'>
                    CSV file of {this.state.sourcePlaylist.name}'s track data
                </Button >)
        recommendedPlaylistTableDisplayBtn = (
            <Button onClick={() => { document.getElementById('recommended-playlist-table').style.display = 'initial' }}
                style={{ color: 'white', backgroundColor: 'darkslategray' }}>
                What would you recommend me?
            </Button >)

        return (
            <div style={styles} >
                <h1>Incoming playlist data!</h1>
                {this.props.children}

                <div className='playlist-action-buttons' style={{ marginBottom: '16px' }}>
                    {recommendedPlaylistTableDisplayBtn}
                    {sourcePlaylistDataDownloadBtn}
                </div>
                {playlistComponent}
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

