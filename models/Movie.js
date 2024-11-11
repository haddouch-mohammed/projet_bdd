// Movie.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    comment: String,
    rating: { type: Number, min: 1, max: 5 } // Note entre 1 et 5 étoiles
});

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
    releaseDate: Date,
    reviews: [ReviewSchema] // Ajout des avis
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
