/* 
    Handles authentication and data retreival with Spotify API
    For use with online React web applications.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu)
    @date       3/14/19
*/

//  Internal Components
import React from 'react'
import Axios from 'axios'
import AxiosRetry from 'axios-retry'

//  Resources
import auth from '../../resources/auth.json'   //  Must include valid IDs before methods are called

AxiosRetry(Axios, { retries: 5 });  //  Retry when API calls fail

class SpotifyDataHandler extends React.Component {

    //  Universally handles errors
    errorInterceptor = () => Axios.interceptors.response.use(
        response => response,
        error => {
            const status = error.response;
            if (status === 404) {
                console.err('Resource not found')
                // Custom function
            }
            return Promise.reject(error);
        }
    );

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

export default SpotifyDataHandler
