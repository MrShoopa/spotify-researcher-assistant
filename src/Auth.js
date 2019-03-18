/*  Authenticating through Spotify and retreiving Access Token  */
var Request = require('request');
var CORS = require('cors');
var Express = require('express');

var auth = require('./resources/auth.json');
auth = auth.spotify


var App = Express();
App.use(CORS())


// your application requests authorization
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
        auth.access.token = body.access_token
    } else {
        console.error('Cannot authenticate this application', error)
    }
});