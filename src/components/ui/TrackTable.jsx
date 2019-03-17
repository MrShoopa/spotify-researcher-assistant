import React from 'react'
import './TrackTable.scss'


function TrackTable(props) {

    // Generates Red-Green color based on track's 'energy' value.
    function determineStrengthColor(nrg_val) {
        const green = 120

        var hue = green * (1 - nrg_val)

        // Return a CSS HSL string
        return 'hsl(' + hue + ', 100%, 30%)';
    }

    function showMoreInfo() {
        console.log('Graph will come soon')
    }

    // Table of tracks featuring five details as listed below.
    return (
        <div>
            <table id='track-table'>
                <thead>
                    <tr>
                        <th>
                            <button type='sort' name='artist' onClick={() => props.sortBy('artist')}>
                                Artist
                            </button>
                        </th>
                        <th>
                            <button type='sort' name='title' onClick={() => props.sortBy('title')}>
                                Title
                            </button>
                        </th>
                        <th>
                            <button type='sort' name='energy' onClick={() => props.sortBy('energy')}>
                                Energy
                            </button>
                        </th>
                        <th>
                            <button type='sort' name='valence' onClick={() => props.sortBy('valence')}>
                                Valence
                            </button>
                        </th>
                        <th>
                            <button type='sort' name='seconds' onClick={() => props.sortBy('duration_ms')}>
                                Seconds
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.track_list.map(track =>
                            (
                                <tr className="track-table-item" key={track.title}
                                    style={{ backgroundColor: determineStrengthColor(track.energy) }}
                                    onClick={() => showMoreInfo()}>
                                    <td>{track.artist}</td>
                                    <td>{track.title}</td>
                                    <td>{track.energy}</td>
                                    <td>{track.valence}</td>
                                    <td>{Math.floor((track.duration_ms / 1000))}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            <br></br>
        </div>
    )
}

export default TrackTable