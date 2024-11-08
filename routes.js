const express = require('express');
const router = express.Router();
const Movie = require('./models/Movie');
const Seance = require('./models/Seance');
const multer = require('multer');
const path = require('path');

const Reservation = require('./models/Reservation');



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



router.get('/users', async (req, res) => {
    try {
        const movies = await Movie.find(); // Récupère tous les films depuis la base de données
        res.render('users', { movies });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des films');
    }
});

// Route pour soumettre une réservation
// Route pour afficher la page de réservation pour une séance spécifique
router.get('/reservation/:seanceId', async (req, res) => {
    try {
        const seanceId = req.params.seanceId;
        
        // Récupérer la séance à partir de la base de données
        const seance = await Seance.findById(seanceId);
        
        if (!seance) {
            return res.status(404).send("Séance non trouvée");
        }

        // Rendre la vue 'reservation' en passant les informations de la séance
        res.render('reservation', { seance });
    } catch (error) {
        console.error("Erreur lors de la récupération de la séance :", error);
        res.status(500).send("Erreur interne du serveur");
    }
});



router.get('/seances/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        // Récupère toutes les séances pour ce film
        const sessions = await Seance.find({ movieId: movieId }).populate('movieId');
        
        // Pour chaque séance, on calcule le nombre total de sièges réservés
        for (let session of sessions) {
            const reservations = await Reservation.find({ seanceId: session._id }); // Trouve toutes les réservations pour cette séance
            
            let totalReservedSeats = 0;
            // Pour chaque réservation, ajouter le nombre de sièges réservés
            reservations.forEach(reservation => {
                totalReservedSeats += reservation.seatsReserved.length; // Nombre de sièges réservés dans cette réservation
            });

            // Ajoute le nombre total de sièges réservés à l'objet séance
            session.totalReservedSeats = totalReservedSeats;
        }

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


// Affiche les séances d'un film spécifique
router.get('/seancesusers/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const sessions = await Seance.find({ movieId: movieId }).populate('movieId');
        // Convertir dateTime en objet Date si nécessaire
        sessions.forEach(session => {
            session.dateTime = new Date(session.dateTime);
        });
        res.render('sessionsusers', { sessions });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des séances.');
    }
});
/// Route pour soumettre une réservation
router.post('/submit-reservation', async (req, res) => {
    try {
        const { seanceId, seats } = req.body;

        // Vérifier si des sièges ont été fournis
        if (!seats || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ message: "Aucun siège fourni.", success: false });
        }

        // Récupérer toutes les réservations pour la séance
        const existingReservations = await Reservation.find({ seanceId });

        // Extraire tous les sièges réservés
        const reservedSeats = existingReservations.flatMap(reservation => reservation.seatsReserved);

        // Vérifier si les sièges demandés sont déjà réservés
        const alreadyReservedSeats = seats.filter(seat => reservedSeats.includes(seat));

        if (alreadyReservedSeats.length > 0) {
            return res.status(400).json({
                message: `Les sièges suivants sont déjà réservés : ${alreadyReservedSeats.join(', ')}`,
                success: false
            });
        }

        // Créer une nouvelle réservation
        const reservation = new Reservation({
            seanceId: seanceId,
            seatsReserved: seats.filter(seat => seat) // Exclut les sièges vides
        });

        await reservation.save();
        res.json({ message: "Réservation effectuée avec succès !", success: true });
    } catch (error) {
        console.error("Erreur lors de la réservation :", error);
        res.status(500).json({ message: "Erreur interne du serveur", success: false });
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
