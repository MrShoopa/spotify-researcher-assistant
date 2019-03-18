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
                backgroundColor: 'none',

                data: [{
                    x: .41,
                    y: 0
                }],

                pointBackgroundColor: ["Red"],
                pointBorderColor: ["Black"]
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
            formatted_data.datasets[0].pointBackgroundColor[index] =
                determineStrengthColor(track.energy)
            formatted_data.datasets[0].pointBorderColor[index] = 'black'
        })

        return formatted_data
    }

    let options = {
        title: {
            display: true,

            text: 'Energy vs. Valence of Tracks',
            fontColor: 'white',
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,

                    labelString: 'Valence',
                    fontColor: 'white'
                },
                ticks: {
                    beginAtZero: true,

                    max: 1,
                    fontColor: 'white'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,

                    labelString: 'Energy',
                    fontColor: 'white'
                },
                ticks: {
                    beginAtZero: true,

                    max: 1,
                    fontColor: 'white'
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

    function determineStrengthColor(nrg_val) {
        const green = 120

        var hue = green * (1 - nrg_val)

        // Return a CSS HSL string
        return 'hsl(' + hue + ', 100%, 50%)';
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
    margin: '10px',
    backgroundColor: 'slategrey',
    color: 'white',
    borderRadius: '5px'
}

export default TrackScatterGraph