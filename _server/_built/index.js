/*
    Back-end server for storing Spotify song data
    encountered by client-side companion.

    @author Joe Villegas
    @date 5/10/19
    @reference MERN tutorial on edureka!
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* --- Server-side --- */
import { GraphQLServer } from 'graphql-yoga';
import * as Mongoose from 'mongoose';
/*  Custom Modules  */
//  Items
import { Song } from './interfaces/schemas';
const mongodb_url = "mongodb://localhost/mern-test";
Mongoose.connect(mongodb_url, { useNewUrlParser: true });
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

`;
//  Function resolvers
const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
        songs: () => Song.find()
    },
    Mutation: {
        createSong: (_, { title, artist, genre }) => __awaiter(void 0, void 0, void 0, function* () {
            const song = new Song({
                title,
                artist,
                genre
            });
            yield song.save();
            return song;
        }),
        updateSong: (_, { id, complete }) => __awaiter(void 0, void 0, void 0, function* () {
            yield Song.findByIdAndUpdate(id, {
                complete
            });
            //  If successful
            return true;
        }),
        removeSong: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            yield Song.findByIdAndRemove(id);
            console.log('i tried to DELETE YAAAA');
            //  If successful
            return true;
        }),
    }
};
const server = new GraphQLServer({
    typeDefs,
    resolvers
});
Mongoose.connection.once("open", function () {
    server.start(null, // Options
    //  Callback
    () => console.log('Mongoose server is running on localhost:4000.'));
});
