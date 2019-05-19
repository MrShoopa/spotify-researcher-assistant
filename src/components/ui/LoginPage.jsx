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
            <div className="login">
                <Form horizontal>
                    <h1>Welcome to Playlist Recommendation</h1>
                    <br />
                    <FormGroup controlId="formHorizontalEmail">
                        <h4>Please press continue to sign in with Spotify</h4>
                        <Button bsStyle="success" href={url} >Continue</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default LoginPage;
