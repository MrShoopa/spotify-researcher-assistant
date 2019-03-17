import React from 'react'
import ChartJS from 'chart-js'

import './TrackListGraph.scss'

function TrackGraph(props) {

    return (
        <canvas style={graphStyle}></canvas>
    )

}

const graphStyle = {
    backgroundColor: 'white',

    borderRadius: '5px',
    width: '100%'
}

export default TrackGraph