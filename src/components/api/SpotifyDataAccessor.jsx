import SpotifyWebAPI from 'spotify-web-api-js'

class SpotifyDataAccesor {
    spotify = new SpotifyWebAPI()

    setAccessToken(accessToken) {
        this.spotify.setAccessToken(accessToken);
    }

    fetchPlaylist(playlist_id) {
        if (playlist_id === null) {
            return console.error('User did not specify Playlist ID.');
        }

        return this.spotify.getPlaylist(playlist_id)
    }

}

const dataAccessor = new SpotifyDataAccesor();

export default dataAccessor;