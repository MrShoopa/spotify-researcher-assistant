/*
    Back-end server for storing Spotify song data
    encountered by client-side companion.

    @author Joe Villegas
    @date 5/10/19
    @reference MERN tutorial on edureka!
*/

/* --- Server-side --- */

import { GraphQLServer } from 'graphql-yoga'
import * as Mongoose from 'mongoose'

/*  Custom Modules  */

//  Items
import {
  Song
} from './interfaces/schemas'

const mongodb_url = "mongodb://localhost/mern-test"

Mongoose.connect(mongodb_url,
  { useNewUrlParser: true }
)


//  Definitions
const typeDefs = `
  type Query {
    hello(name: String): String!
    songs: [Song]
  }
  type Mutation {
    createSong(title: String!, artist: String!, genre: String?): Song
    # updateSong(id: ID!, complete: Boolean!): Boolean
    removeSong(id: ID!): Boolean
  }

  # Types
  type Song {
    id: ID!
    title: String!
    artist: String!
    genre: String?
  }

`

//  Function resolvers
const resolvers = {
  Query: {
    hello: (_: any, { name }: any) =>
      `Hello ${name || 'World'}`,
    songs: () =>
      Song.find()
  },
  Mutation: {
    createSong: async (_: any, { title, artist, genre }: any) => {
      const song = new Song({
        title,
        artist,
        genre
      })


      await song.save()
      return song
    },

    updateSong: async (_: any, { id, complete }: any) => {
      await Song.findByIdAndUpdate(id, {
        complete
      })

      //  If successful
      return true;
    },

    removeSong: async (_: any, { id }: any) => {
      await Song.findByIdAndRemove(id)

      console.log('i tried to DELETE YAAAA')

      //  If successful
      return true
    },

    /* 
      deleteAllSongs: async (_) => {
        Song.findAll
      }
   */
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

Mongoose.connection.once("open",
  function () {
    server.start(null,  // Options
      //  Callback
      () =>
        console.log('Mongoose server is running on localhost:4000.'))
  })