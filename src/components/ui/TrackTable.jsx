import React from 'react'

function TrackTable(props) {
    return (
        <table>
            <thead>
                <th>
                    <button onClick={() => props.sortBy('artist')} />
                    Artist
                </th>
                <th>
                    <button onClick={() => props.sortBy('title')} />
                    Title
                </th>
                <th>
                    <button onClick={() => props.sortBy('energy')} />
                    Energy
                </th>
                <th>
                    <button onClick={() => props.sortBy('valence')} />
                    Valence
                </th>
                <th>
                    <button onClick={() => props.sortBy('duration_ms')} />
                    Seconds
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
                                <td>{Math.floor((track.duration_ms / 1000) % 60)}</td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    )
}

export default TrackTable