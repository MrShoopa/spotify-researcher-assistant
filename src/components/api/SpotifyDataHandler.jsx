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
import auth from '../resources/auth.json'   //  Must include valid IDs before methods are called

AxiosRetry(Axios, { retries: 5 });  //  Retry when API calls fail

class SpotifyDataHandler extends React.Component {

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

    authenticate = () => {

    }


    componentDidMount = () => {
        this.props.onRef(this)
    }
    componentWillUnmount = () => {
        //this.props.onRef(undefined)
    }

    render() {
        return <p></p>
    };
}