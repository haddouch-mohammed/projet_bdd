const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseYear: Number,
    duration: Number,
    genre: String,
    director: String,
    actors: [String],
    synopsis: String,
    classification: String,
    language: String,
    trailer: String,
    poster: String,
    format: String,
    productionStudio: String,
    releaseDate: Date
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
