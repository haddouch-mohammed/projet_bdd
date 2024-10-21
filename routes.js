const express = require('express');
const router = express.Router();
const Movie = require('./models/Movie');
const Seance = require('./models/Seance');
const multer = require('multer');
const path = require('path');




// Configuration de multer pour gérer les images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route principale
router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.render('index', { movies });
});

// Formulaire pour ajouter un film
router.get('/movies/new', (req, res) => {
    res.render('addMovie');
});

// Affiche les séances d'un film spécifique
router.get('/seances/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const sessions = await Seance.find({ movieId: movieId }).populate('movieId');
        // Convertir dateTime en objet Date si nécessaire
        sessions.forEach(session => {
            session.dateTime = new Date(session.dateTime);
        });
        res.render('sessions', { sessions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des séances.');
    }
});

router.post('/seances', async (req, res) => {
    const { movieId, dateTime, room, capacity, projectionTechnology, ticketPrice, availableSeats, onlineAvailability } = req.body;

    try {
        const newSeance = new Seance({
            movieId,
            dateTime: new Date(dateTime), // Assurez-vous que cela soit une date valide
            room,
            capacity,
            projectionTechnology,
            ticketPrice: parseFloat(ticketPrice), // Convertir le prix en nombre à virgule flottante
            availableSeats,
            onlineAvailability: onlineAvailability === 'true' // Convertir en booléen
        });
        
        await newSeance.save();
        res.redirect('/'); // Rediriger vers la liste des films
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'ajout de la séance.');
    }
});


// Ajouter un film (POST)
router.post('/movies', upload.single('poster'), async (req, res) => {
    const { title, releaseYear, duration, genre, director, actors, synopsis, classification, language, trailer, format, productionStudio, releaseDate } = req.body;
    const poster = req.file ? `/images/${req.file.filename}` : '';

    const movie = new Movie({
        title,
        releaseYear,
        duration,
        genre,
        director,
        actors: actors.split(',').map(actor => actor.trim()),
        synopsis,
        classification,
        language,
        trailer,
        poster,
        format,
        productionStudio,
        releaseDate
    });

    await movie.save();
    res.redirect('/');
});

// Formulaire pour modifier un film
router.get('/movies/edit/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('editMovie', { movie });
});

// Modifier un film (POST)
router.post('/movies/edit/:id', upload.single('poster'), async (req, res) => {
    const { title, releaseYear, duration, genre, director, actors, synopsis, classification, language, trailer, format, productionStudio, releaseDate } = req.body;
    const poster = req.file ? `/images/${req.file.filename}` : '';

    const movie = await Movie.findById(req.params.id);
    movie.title = title;
    movie.releaseYear = releaseYear;
    movie.duration = duration;
    movie.genre = genre;
    movie.director = director;
    movie.actors = actors.split(',').map(actor => actor.trim());
    movie.synopsis = synopsis;
    movie.classification = classification;
    movie.language = language;
    movie.trailer = trailer;
    movie.poster = poster || movie.poster; // Garde l'ancien poster si aucun nouveau n'est fourni
    movie.format = format;
    movie.productionStudio = productionStudio;
    movie.releaseDate = releaseDate;

    await movie.save();
    res.redirect('/');
});

// Supprimer un film
router.post('/movies/delete/:id', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Formulaire pour ajouter une séance
router.get('/seances/new', async (req, res) => {
    const movies = await Movie.find();
    res.render('addSeance', { movies });
});

module.exports = router;
