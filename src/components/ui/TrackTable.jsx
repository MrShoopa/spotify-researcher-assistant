import React from 'react'

function TrackTable(props) {
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
                            <tr>
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