/*  
    Generates an HTML table of a playlist recommendation

    @author Joe (joev@uw.edu)
*/

import React from 'react'

import SpotifyDataHandler from '../../../api/SpotifyDataHandler'

import './PlaylistRecommendationTable.scss'

export default class PlaylistRecommendationTable extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            recommendedPlaylistTable: (<p>'where's the table</p>)
        }

        //TODO: Add sorting function
        this.sortBy = this.sortBy.bind(this)
    }

    // Start fetching a recommended playlist before generating table
    componentDidMount() {

        //* See function to customize parameters
        SpotifyDataHandler.fetchCustomizedRecommendation(
            this.props.energyAverage, this.props.valenceAverage, this.props.topArtistID)
            .then(async tracks => {
                await new Promise((resolve, reject) => {
                    this.setState(() => ({
                        recommendedPlaylist: tracks
                    }))

                    //.console.log(resolve)
                })
            })
    }

    getCurrentRecommendation = () => {
        return this.state.recommendedPlaylist
    }

    //  Returns an HSL color (green-red) according to strength of a song's Energy value
    determineStrengthColor = (nrg_val) => {
        const green = 120

        var hue = green * (1 - nrg_val)

        // Return an CSS HSL string
        return 'hsl(' + hue + ', 100%, 50%)';
    }

    //  Display more info on a single track
    showMoreInfo = () => {
        console.log('You clicked on a song! A future feature will replace this message!')
    }

    sortBy = (type) => {
        console.log(`Sorting by ${type}`)

        this.setState({
            track_data:
                this.props.track_data.sort((low, high) => {
                    if (typeof low[type] === 'string') return ('' + low[type]).localeCompare(high[type]);
                    return low[type] - high[type]
                })
        })
    }

    // Table of tracks displaying details according to the ones in the table header.
    render = () => {
        //.console.log(this.state.recommendedPlaylist)

        let playlistTable
        if (this.state.recommendedPlaylist) {

            playlistTable =
                (<tbody>
                    {
                        this.state.recommendedPlaylist.map(track =>
                            (
                                <tr className="track-table-item" key={`item-${track.id}`}
                                    style={{ backgroundColor: this.determineStrengthColor(track.energy) }}>
                                    <td className='artist-text'>
                                        {
                                            track.artists.map((artist, index) => {
                                                if (index === track.artists.length - 1)
                                                    return (<a href={artist.external_urls.spotify} key={`item-${artist.id}`}>
                                                        {artist.name}
                                                    </a>)

                                                return (<a href={artist.external_urls.spotify} key={`item-${artist.id}`}>
                                                    {artist.name},{' '}
                                                </a>)
                                            }
                                            )
                                        }
                                    </td>
                                    <td className='title-text'>
                                        <a href={track.external_urls.spotify}>
                                            {track.name}
                                        </a>
                                    </td>
                                    <td className='length-text'>{`
                                        ${Math.floor((track.duration_ms / 1000) / 60)}
                                        :
                                        ${Math.floor((track.duration_ms / 1000) % 60)
                                            .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                                    `}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>)


            console.log('Generated recommended playlist off custom queries!')
        }


        if (playlistTable)
            return (
                <div id='recommended-playlist-table' style={{ display: 'none', animationDelay: '0ms' }}>
                    <h4>Here's some recommendations for you!</h4>
                    <table className='track-table' >
                        <thead>
                            <tr>
                                <th>
                                    <button type='sort' name='artist' onClick={() => this.state.sortBy('artist')}>
                                        Artist
                                    </button>
                                </th>
                                <th>
                                    <button type='sort' name='title' onClick={() => this.state.sortBy('title')}>
                                        Title
                                    </button>
                                </th>
                                <th>
                                    <button type='sort' name='seconds' onClick={() => this.state.sortBy('duration_ms')}>
                                        Length
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        {playlistTable}
                    </table>
                    <br></br>
                </div>
            )
        else
            return (<p>Loading recommendations...</p>)
    }
}