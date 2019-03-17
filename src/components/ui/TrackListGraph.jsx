import React from 'react'
import { Line } from 'react-chartjs-2'


function TrackListGraph(props) {


    let data = {

    }

    let options = {
        title: {
            display: true,
            text: 'Energy vs. Valence'

        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                },
                show: true
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        showLines: true

    }

    return (
        <div style={chartStyle}>
            <Line data={data} options={options}
                width={100}
                height={100} />
        </div>
    )
}

const chartStyle = {
    backgroundColor: 'white'
}

export default TrackListGraph