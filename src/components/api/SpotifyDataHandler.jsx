/* 
    Handles authentication and data retreival with Spotify API
    For use with online React web applications.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu)
    @date       3/14/19
*/

//  Internal Components
import React from 'react'
import SpotifyWebAPI from 'spotify-web-api-js'
import Axios from 'axios'
import AxiosRetry from 'axios-retry'

//  Resources
import auth from '../../resources/auth.json'   //  Must include valid IDs before methods are called
import track_list from '../../data/track_list.json'
import track_data from '../../data/track_info.json'
import track_list_sample from '../../data/track_list_sample.json'
import track_data_sample from '../../data/track_info_sample.json'


const Spotify = new SpotifyWebAPI()

const authConfig = {
    method: 'post',
    url: auth.spotify.access.url,
    params: {
        grant_type: 'client_credentials'
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',

        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'origin, x-requested-with, Content-Type, Accept'
    },
    auth: {
        username: auth.spotify.client.id,
        password: auth.spotify.client.secret
    }
}

AxiosRetry(Axios, { retries: 5 });  //  Retry when API calls fail


class SpotifyDataHandler extends React.Component {
    constructor (props) {
        super(props)

        let TOKEN

        Axios.request(authConfig)
            .then(res => {
                console.log(res)
            })
            .catch(err => (
                console.log(err)
            ))

        if (TOKEN) Spotify.setAccessToken(auth.spotify.access.token)


    }



    //  Authenticate app access to Spotify Web API.
    authenticate = async () => {

        console.log('Hello, you interacted with the form input! :)')

    }

    /*   Data fetch functions   */
    //  Returns Track object using specified playlist ID(s), defaults to sample ID
    fetchPlaylistData = (
        playlist_id = this.state.playlist_id) => {
        //  When sample playlist is requested
        playlist_id = 'sample' ? auth.spotify.sample.playlist_id : playlist_id

        if (playlist_id === null) return console.error('User did not specify Playlist ID.')

        Spotify.getPlaylist(playlist_id)
            .then(data => {
                track_list = data
                console.log(`Received a playlist: `, data)
            }, err => {
                console.log(`Error fetching playlist - `, err)
            })
    }

    //  Returns Track object(s) using specified Track ID(s), defaults to inputted playlist ID
    fetchTrackData = (
        track_ids = this.generateTrackIDListString()) => {
        //  When sample track data is requested
        if (track_ids === 'sample') return track_data_sample.audio_features

        Spotify.getAudioFeaturesForTracks(track_ids)
            .then(data => {
                track_data = data
                console.log(`Audio features for track(s): `, data)
            }, err => {
                console.log(`Error fetching track features - `, err)
            })

        let index = 0

        //  Append Title and Artist to Features list
        track_list.items.forEach(track => {
            track_data[index++].audio_features.title = track.title
            track_data[index++].audio_features.artist = track.artist
        })

        return track_data.audio_features
    }

    /*  Formatting/Generation functions */

    //  Returns string of track IDs from currently populated playlist JSON
    generateTrackIDListString = async () => {
        if (!track_list) await this.fetchPlaylistData()

        var ids_string = ""

        for (var i = 0; i < track_list.items.length(); i++) {
            ids_string += `${track_list.items[i].track.id},`
        }

        return ids_string
    }

    /*  Random data fetch functions   */

    //  Returns random Track ID using an exisiting Playlist object
    randomTrackID = async () => {
        if (!track_list) await this.fetchPlaylistData()

        let track_amount = track_list.items.length()

        return track_list.items[Math.floor(Math.random() * track_amount)].track.id
    }

    /*  Lifecycle functions  */
    componentDidMount = () => {
        this.props.onRef(this)
    }
    componentWillUnmount = () => {
        this.props.onRef(undefined)
    }

    //  This is a purely functional component, hence no need to return any HTML.
    render() {
        return (<p></p>)
    }
}
SpotifyDataHandler.defaultProps = {

}

export default SpotifyDataHandler
