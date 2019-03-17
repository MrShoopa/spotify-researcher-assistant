import React from 'react'

function TrackTable(props) {

    function determineStrengthColor(nrg_val) {
        if (nrg_val < .2) return 'energy-0'
        else if (nrg_val < .4) return 'energy-1'
        else if (nrg_val < .6) return 'energy-2'
        else if (nrg_val < .8) return 'energy-3'
        else if (nrg_val < .1) return 'energy-4'
        else if (nrg_val < .1) return 'energy-max'
        else return 'energy-unknown'

    }

    return (
        <table>
            <thead>
                <th>
                    <button onClick={() => props.sortBy('artist')}>
                        Artist
                    </button>
                </th>
                <th>
                    <button onClick={() => props.sortBy('title')}>
                        Title
                    </button>
                </th>
                <th>
                    <button onClick={() => props.sortBy('energy')}>
                        Energy
                    </button>
                </th>
                <th>
                    <button onClick={() => props.sortBy('valence')}>
                        Valence
                    </button>
                </th>
                <th>
                    <button onClick={() => props.sortBy('duration_ms')}>
                        Seconds
                    </button>
                </th>
            </thead>
            <tbody>
                {
                    props.track_list.map(track =>
                        (
                            <tr className={() => this.determineStrengthColor(track.energy)}>
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
    )
}

export default TrackTable