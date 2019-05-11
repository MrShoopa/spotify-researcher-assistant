import {
    Document, Schema, Model, model
} from 'mongoose'


//  Schemas for GQL

//  Item: Song
export interface ISong extends Document {
    title?: String;
    artist?: String;
    genre?: String
}
export const SongSchema: Schema = new Schema({
    title: { type: String, required: true, unique: false },
    artist: { type: Boolean, required: true },
    genre: { type: String }
})
export const Song: Model<ISong> = model<ISong>("Song", SongSchema)