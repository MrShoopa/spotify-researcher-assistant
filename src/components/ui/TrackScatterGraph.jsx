import React from 'react'
import { Scatter } from 'react-chartjs-2'


function TrackScatterGraph(props) {


    function parseData() {
        console.log('Graphing following data:', props.track_list)

        // SAMPLE DATA TABLE
        let formatted_data = {
            labels: ["Track 1"],
            datasets: [{
                label: 'Energy vs. Valence',
                data: [{
                    x: .41,
                    y: 0
                }]
            }]
        }

        //  Parsing data
        props.track_list.forEach((track, index) => {
            formatted_data.labels[index] = `${track.title} - ${track.artist}`
            formatted_data.datasets[0].data[index] =
                {
                    x: track.valence,
                    y: track.energy
                }
        })

        return formatted_data
    }

    let options = {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 1
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 1
                }
            }]
        },
        tooltips: {
            callbacks: {
                //  Manipulates label of each data point to respective title/artist of song
                label: function (item, data) {
                    var label = data.labels[item.index];
                    return label + ': (' + item.xLabel + ', ' + item.yLabel + ')';
                }

            }
        }

    }

    return (
        <div style={chartStyle}>
            <Scatter data={parseData} options={options}
                width={100}
                height={100} />
        </div>
    )
}

const chartStyle = {
    backgroundColor: 'white'
}

export default TrackScatterGraph