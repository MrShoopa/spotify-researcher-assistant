/* 
    Handles authentication and data retreival with Spotify API
    For use with online React web applications.
    
    @reference  (https://developer.spotify.com/documentation/web-api/)
    @author     Joe Villegas (joev@uw.edu)
    @date       3/14/19
*/

//  Internal Components
import React from 'react'
import SpotifyWebAPI from 'spotify-web-api-js'

//  Resources
import auth from '../../resources/auth.json'   //  Must include valid IDs before methods are called

//  Samples
import track_list from '../../data/track_list.json'
import track_data from '../../data/track_info.json'
//import track_list_sample from '../../data/track_list_sample.json'
import track_data_sample from '../../data/track_info_sample.json'
import { Promise } from 'q';


class SpotifyDataHandler {
    constructor (token) {
        this.setAccessToken(token)  // Sets token across application

        this.user_info = this.Spotify.getMe().then((result) => {
            console.log(`Logged in as ${result.display_name}`)

            return result
        }
        )
    }

    Spotify = new SpotifyWebAPI()


    setAccessToken(access_token) {
        this.Spotify.setAccessToken(access_token);

        sessionStorage.setItem('token', access_token);// Sets new global token

        console.log('New token for Spotify set from user input.')
    }

    /*   Data fetch functions   */

    async fetchPlaylists() {
        let playlists

        await this.Spotify.getUserPlaylists(this.user_info.id)
            .catch((error) => {
                console.error(error)
            }).then((result) => {
                //console.log(result)
                playlists = result.items
            }).finally(() => {
                return 'null'
            })

        return playlists
    }

    fetchPlaylist(playlistID) {
        if (playlistID === null) {
            return console.error('User did not specify Playlist ID.');
        }

        return this.Spotify.getPlaylist(playlistID)
    }

    async fetchPlaylistID(name) {
        if (!this.playlists)
            await this.fetchPlaylists()
        console.log(this.playlists)

        if (!name) {
            console.err('Playlist ID fetching failed: No playlist info specified.')
            return 'not cool'
        } else {
            //this.Spotify
            return 'cool'
        }
    }

    //  Returns Track object using specified playlist ID(s), defaults to sample ID
    fetchPlaylistData = (
        playlistID = this.state.playlistID) => {
        //  When sample playlist is requested
        playlistID = 'sample' ? auth.spotify.sample.playlistID : playlistID

        if (playlistID === null) return console.error('User did not specify Playlist ID.')

        this.Spotify.getPlaylist(playlistID)
            .then(data => {
                track_list = data
                console.log(`Received a playlist: `, data)
            }, err => {
                console.log(`Error fetching playlist - `, err)
            })
    }

    //  Returns Track object(s) using specified Track ID(s), defaults to inputted playlist ID
    fetchTrackData = (
        track_ids = this.generateTrackIDListString()) => {
        //  When sample track data is requested
        if (track_ids === 'sample') return track_data_sample.audio_features

        return new Promise((res, rej) => {
            this.Spotify.getAudioFeaturesForTracks(track_ids)
                .then(data => {
                    //.console.log(`Audio features for track `, data.audio_features[0])
                    res(data.audio_features[0])
                }, err => {
                    console.log(`Error fetching track features - `, err)
                    rej(new Error(`Error fetching track features - ${err}`))
                })
        })
    }

    /*  Formatting/Generation functions */

    //  Returns string of track IDs from currently populated playlist JSON
    generateTrackIDListString = async () => {
        if (!track_list) await this.fetchPlaylistData()

        var ids_string = ""

        for (var i = 0; i < track_list.items.length(); i++) {
            ids_string += `${track_list.items[i].track.id},`
        }

        return ids_string
    }

    /*  Random data fetch functions   */

    //  Returns random Track ID using an exisiting Playlist object
    randomTrackID = async () => {
        if (!track_list) await this.fetchPlaylistData()

        let track_amount = track_list.items.length()

        return track_list.items[Math.floor(Math.random() * track_amount)].track.id
    }

    /*  Customized recommendation fetchers */

    // Based off a playlist's average energy, valence, and best artist. //* Version 1
    fetchCustomizedRecommendation = async (energy, valence, artistID) => {
        let recommendedPlaylist = await this.Spotify.getRecommendations({
            limit: '25',
            target_energy: energy,      //  Average
            target_valence: valence,    //  Average
            seed_artists: artistID      //  Top artist
        })

        console.log(recommendedPlaylist)
        return recommendedPlaylist.tracks

    }

    /*  Lifecycle functions  */
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

export default new SpotifyDataHandler(sessionStorage.getItem('token'));