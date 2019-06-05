/*  
    Generates an interactive scatter plot of a playlist's tracks
    comparing their energy and valence values.

    @author Joe (joev@uw.edu)
    @reference (https://www.chartjs.org/docs/2.8.0/)
*/

import React from 'react'
import { Scatter } from 'react-chartjs-2'


export default function TrackScatterGraph(props) {


    function parseData() {
        console.log('Graphing following data:', props.trackList)

        // SAMPLE DATA TABLE
        let formattedData = {
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
        props.trackList.forEach((track, index) => {
            let artistString = track.artists.map(artist => {
                return {
                    name: artist.name,
                    artistType: artist.type
                }
                
            })


            formattedData.labels[index] = `${track.trackName} - ${track.artistName}`   //  Datapoint name
            formattedData.datasets[0].data[index] =
                {
                    x: track.valence,
                    y: track.energy
                }

            //  Styling according to Energy value
            formattedData.datasets[0].pointBackgroundColor[index] =
                determineStrengthColor(track.energy)
            formattedData.datasets[0].pointBorderColor[index] = 'black'
        })

        return formattedData
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
                //  label: Manipulates label of each data point to respective title/artist of song
                label: function (item, data) {
                    var label = data.labels[item.index];
                    return label + ': (' + item.xLabel + ', ' + item.yLabel + ')';
                }
            }
        }

    }

    //  Returns an HSL color (green-red) according to strength of a song's Energy value
    function determineStrengthColor(energyVal) {
        const green = 120

        var hue = green * (1 - energyVal)

        // Return an CSS HSL string
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
    borderRadius: '5px',
    opacity: '0',

    animation: 'initial-screen-slide-up-empty-full ease-out .5s',
    animationDelay: '.75s',
    animationFillMode: 'forwards'
}