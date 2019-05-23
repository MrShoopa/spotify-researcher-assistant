/*  
    Generates an HTML table of a playlist recommendation

    @author Joe (joev@uw.edu)
*/

import React from 'react'

import SpotifyDataHandler from '../../api/SpotifyDataHandler'

import '../Analytics/TrackTable.scss'

export default class PlaylistRecommendationTable extends React.Component {
    constructor (props) {
        super(props)



    }

    componentDidMount() {

        //* See function to customize parameters
        let recommendedPlaylist = SpotifyDataHandler.fetchCustomizedRecommendation(this.props.energy, this.props.valence, this.props.artistID)

        console.log(recommendedPlaylist)
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

    // Table of tracks displaying details of the ones in the table header.
    render = () => (
        <div className='track-table'>
            <table id='track-table'>
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
                            <button type='sort' name='energy' onClick={() => this.state.sortBy('energy')}>
                                Energy
                            </button>
                        </th>
                        <th>
                            <button type='sort' name='valence' onClick={() => this.state.sortBy('valence')}>
                                Valence
                            </button>
                        </th>
                        <th>
                            <button type='sort' name='seconds' onClick={() => this.state.sortBy('duration_ms')}>
                                Seconds
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/*
                        this.state.track_list.map(track =>
                            (
                                <tr className="track-table-item" key={track.title}
                                    style={{ backgroundColor: this.determineStrengthColor(track.energy) }}
                                    onClick={() => this.showMoreInfo()}>
                                    <td>{track.artist}</td>
                                    <td>{track.title}</td>
                                    <td>{track.energy}</td>
                                    <td>{track.valence}</td>
                                    <td>{Math.floor((track.duration_ms / 1000))*}</td>
                                </tr>
                            )
                        )
                    */}
                </tbody>
            </table>
            <br></br>
        </div>
    )
}