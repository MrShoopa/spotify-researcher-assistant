import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';
import './LoginPage.scss';
import auth from '../../resources/auth.json';


class LoginPage extends Component {
    render() {
        const client_id = auth.spotify.client.id;
        const redirect_uri = auth.spotify.client.redirect_uri;
        const scope = 'user-read-private user-read-email';
        const response_type = 'token';
        const state = '123';

        const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}&state=${state}`
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
