import React from 'react'
import ReactDOM from 'react-dom'

import './TrackAnalysis.scss'

export default class StoryScreen extends React.Component {

    generateTable = () => {

    }

    render = () => {

        return (
            <div >
                <header className="App-header" >
                    <p>
                        Let's learn about your music!
                    </p>
                </header>
                <div className="Track-table">
                    <div className="children">
                        {this.generateTable()}
                    </div>
                </div>
                <footer className="App-footer" >
                    <p>
                    </p>
                </footer>
            </div>
        )
    }
}