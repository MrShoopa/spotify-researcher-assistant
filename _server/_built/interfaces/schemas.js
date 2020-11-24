import { Schema, model } from 'mongoose';
export const SongSchema = new Schema({
    title: { type: String, required: true, unique: false },
    artist: { type: Boolean, required: true },
    genre: { type: String }
});
export const Song = model("Song", SongSchema);
