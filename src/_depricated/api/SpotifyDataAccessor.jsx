import SpotifyWebAPI from 'spotify-web-api-js'

class SpotifyDataAccesor {
    spotify = new SpotifyWebAPI()

    constructor() {
        //Accessing the accessToken of previous session
        const token = sessionStorage.getItem('token');
        this.setAccessToken(token);

    }

    setAccessToken(accessToken) {
        this.spotify.setAccessToken(accessToken);
    }

    fetchPlaylist(playlistID) {
        if (playlistID === null) {
            return console.error('User did not specify Playlist ID.');
        }

        return this.spotify.getPlaylist(playlistID)
    }

}

export default SpotifyDataAccesor;