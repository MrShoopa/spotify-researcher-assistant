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


const Spotify = new SpotifyWebAPI()
const authProps = {
    method: 'post',
    url: auth.universal.proxy_url + auth.spotify.access.url,
    data: {
        grant_type: 'client_credentials'
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
            'Basic ' + (new Buffer(`${auth.spotify.client.id}:${auth.spotify.client.secret}`).toString('base64')),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'origin, x-requested-with, Content-Type, Accept'
    },
    responseType: 'json'
}
AxiosRetry(Axios, { retries: 5 });  //  Retry when API calls fail


class SpotifyDataHandler extends React.Component {
    constructor (props) {
        super(props)

        let TOKEN

        Axios.request(authProps)
            .then(res => {
                console.log(res)
            })
            .catch(err => (
                console.log(err)
            ))

        if (TOKEN) Spotify.setAccessToken(auth.spotify.access.token)


    }



    //  Authenticate app access to Spotify Web API.
    authenticate = () => {

        console.log('Hello, you interacted with the form input! :)')
    }


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
