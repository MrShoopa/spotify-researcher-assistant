import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';
import './LoginPage.scss';
import auth from '../../resources/auth.json';

import _localhost from '../../App'


class LoginPage extends Component {
    render() {
        const clientID = auth.spotify.client.id;
        const redirectURI = !_localhost ?
            auth.spotify.client.redirectURI : auth.spotify.client.redirectURILocal
        const scope = 'user-read-private user-read-email';
        const responseType = 'token';
        const state = '123';

        const url =
            `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=${responseType}&state=${state}`
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

export default LoginPage;
