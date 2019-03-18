/*  Authenticating through Spotify and retreiving Access Token  */
//  authOptions reference: (https://github.com/spotify/web-api-auth-examples/blob/master/client_credentials/app.js)

var Request = require('request');
var CORS = require('cors');
var Express = require('express');

//  Accessing current credentials JSON
var auth = require('./resources/auth.json');
auth = auth.spotify


var App = Express();
App.use(CORS())

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' +
            (new Buffer(auth.client.id + ':' + auth.client.secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

Request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(`Received client Spotify info:`, body)
        auth.access.token = body.access_token //  SAVES NEW ACCESS TOKEN
    } else {
        console.error('Cannot authenticate this application', error)
    }
});