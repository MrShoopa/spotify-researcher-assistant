/* 
    Page that handles user login. Prompts user with a sign in button
    which redirects them to Spotify's auth screen to let the app
    have access to Spotify user data locally.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu)
    @date       5/30/19
*/

import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';

import './LoginPage.scss';

import auth from '../../resources/auth.json';


export default class LoginPage extends Component {
    render() {
        //  Authentication and permission parameters
        const clientID = auth.spotify.client.id;
        const scope = 'user-read-private user-read-email';
        const responseType = 'token';
        const state = '123';

        //.console.log(this.props.uri)

        //  Authentication URL
        const url =
            `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${this.props.uri}&scope=${scope}&response_type=${responseType}&state=${state}`

        return (
            <div className="login" style={{ width: '-webkit-fill-available' }}>
                <Form horizontal>
                    <h1>
                        <span role='img' aria-label='Music'>🎶</span>
                        Welcome to Playlist Spotter
                        <span role='img' aria-label='Music'>🎶</span>
                    </h1>
                    <br />
                    <FormGroup controlId="formHorizontalEmail">
                        <h4>Sign in to Spotify to learn about your playlists and get recommendations!</h4>
                        <Button bsStyle="success" href={url} >Continue</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}