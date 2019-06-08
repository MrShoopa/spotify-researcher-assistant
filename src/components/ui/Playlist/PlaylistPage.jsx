/* 
    Handles authentication and data retreival with Spotify API
    For use with online React web applications.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu)
    @date       3/14/19
*/

import React from 'react';
import { Button } from 'react-bootstrap';
import * as jsonexport from 'jsonexport/dist';

//  Components
import SpotifyDataHandler from '../../api/SpotifyDataHandler';

import TrackTable from './Analytics/TrackTable'
import TrackScatterGraph from './Analytics/TrackScatterGraph'
import PlaylistRecommendation from './Recommendation/PlaylistRecommendationTable'

// Internal Components
let recommendedPlaylist, currentPlaylist, currentPlaylistGraph

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

    sortBy = (type) => {
        console.log(type)
        this.setState({
            track_data:
                this.props.track_data.sort((low, high) => {
                    return low[type] - high[type]
                })
        })
    }


    componentDidMount() {
        //  Retrieve playlist ID from user input
        let playlistID = this.props.match.params.playlistId;

        //  Special cases (Ex. user types a name of a playlist)
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

                //  Total audio values across songs of playlist
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


                    return {    //  Returning object for a playlist

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

                        //  Audio metrics (basic)
                        duration_ms: item.track.duration_ms,

                        //  Audio metrics (advanced)

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
            this.setState({ playlist: finalizedData })

            if (this.state.playlist) {
                //* Edit recommendation parameters here

                //  Generate listed table of current playlist's data
                currentPlaylist = (<TrackTable trackList={this.state.playlist} sortBy={this.sortBy} />)
                //  Generate scatter graph of current playlist's data
                currentPlaylistGraph = (<TrackScatterGraph trackList={this.state.playlist} />)
            } else {
                currentPlaylist = (<p>Loading graph...</p>)
            }

            //  Logging quick results of playlist
            console.log(
                `Best artist's ID: ${this.state.topArtistID}
                \nAverage valence: ${this.state.valenceAverage}
                \nAverage energy: ${this.state.energyAverage}`)

            // Generate playlist recommendation with given specific variables
            if (this.state.energyAverage) {
                //* Edit recommendation parameters here
                recommendedPlaylist = (
                    <PlaylistRecommendation
                        energyAverage={this.state.energyAverage}
                        valenceAverage={this.state.valenceAverage}
                        topArtistID={this.state.topArtistID}>
                    </PlaylistRecommendation>)
                //!await this.setState({ recommendedPlaylist: recommendedPlaylist.state })
            } else {
                recommendedPlaylist = (<p>Loading recommendations...</p>)
            }

            // Export source playlist's data (user-defined) to CSV.
            jsonexport(finalizedData, (err, csv) => {
                if (err) return console.log(err);

                console.log(`CSV file of playlist ${playlistID} created.`)
                //.console.log(csv)

                this.setState({ playlistCsv: csv })
            })
        });
    }

    render() {
        const csvHref = `data:text/csv;charset=utf-8,${escape(this.state.playlistCsv)}`
        //  Buttons based on conditions
        let sourcePlaylistDataDownloadBtn, recommendedPlaylistTableDisplayBtn

        //  When the playlist's data has been retrieved, enabled CSV download.
        if (this.state.sourcePlaylist)
            sourcePlaylistDataDownloadBtn = (
                <Button href={csvHref}
                    download="playlist_data.csv"
                    variant='dark'>
                    CSV file of {this.state.sourcePlaylist.name}'s track data
                </Button >)

        //  When a playlist is sucessfully fetched, enable ability to display.
        if (recommendedPlaylist)
            recommendedPlaylistTableDisplayBtn = (
                <Button onClick={() => { document.getElementById('recommended-playlist-table').style.display = 'block' }}
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
                {recommendedPlaylist}
                {currentPlaylist}

                <div style={{
                    backgroundColor: 'rgb(40,40,40)',
                    borderRadius: '10px',
                    width: '90vw', margin: '0 auto',
                }}>
                    {currentPlaylistGraph}
                </div>
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

