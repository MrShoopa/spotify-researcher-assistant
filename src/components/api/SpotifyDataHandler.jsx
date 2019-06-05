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
//import track_data from '../../data/track_info.json'
//import track_list_sample from '../../data/track_list_sample.json'
import track_data_sample from '../../data/track_info_sample.json'
import { Promise } from 'q';


class SpotifyDataHandler {
    constructor (token) {
        this.setAccessToken(token)  // Sets token across application

        this.setUserInfo()
    }

    Spotify = new SpotifyWebAPI()


    setAccessToken(accessToken) {
        this.Spotify.setAccessToken(accessToken);

        sessionStorage.setItem('token', accessToken);// Sets new global token

        console.log('New token for Spotify set from user input!')
    }

    setUserInfo() {
        this.user_info = this.Spotify.getMe().then((result) => {
            console.log(`--- LOGGED IN AS ${result.display_name} ---`)

            return result
        }, error => {
            if (error.result === 401) {
                console.error('Could not log in. Access token invalid.')
            } else if (error.result === 429) {
                console.error('Too many calls. Please retry in a bit.')
            } else {
                console.log(`--- Could not log in to user. ---`)
            }
            return error
        })
    }

    /*   Data fetch functions   */

    async fetchPlaylists() {
        let playlists

        return new Promise((res, rej) => {
            this.Spotify.getUserPlaylists(this.user_info.id, { limit: 50 })
                .catch(error => {
                    rej(error)
                }).then((result) => {
                    console.log(result)
                    playlists = result.items

                    res(playlists)
                })
        })
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
        return new Promise((res, rej) => {
            this.Spotify.getRecommendations({
                limit: '25',
                target_energy: energy,      //  Average
                target_valence: valence,    //  Average
                seed_artists: artistID      //  Top artist
            }).then(data => {
                //.console.log(data)
                res(data.tracks)
            }, err => {
                console.error('Error fetching recommendations')
                rej(err)
            }
            )

        })

    }

    /*  Lifecycle functions  */
    componentDidMount = () => {
        this.props.onRef(this)
    }
    componentWillUnmount = () => {
        this.props.onRef(undefined)
    }

    onReady = () => {
        return new Promise((res, rej) => {

        })
    }

    //  This is a purely functional component, hence no need to return any HTML.
    render() {
        return (<p></p>)
    }
}

export default new SpotifyDataHandler(sessionStorage.getItem('token'));