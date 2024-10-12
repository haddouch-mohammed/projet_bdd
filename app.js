const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer'); // Middleware pour le traitement des fichiers

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'cinemaDB';
let db, filmsCollection;

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où les images seront stockées
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier avec un timestamp
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Pour servir les fichiers d'images

// Connexion à MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connecté avec succès à MongoDB');
        db = client.db(dbName);
        filmsCollection = db.collection('films');
    })
    .catch(error => console.error(error));

// Page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Ajouter un film
app.post('/ajouterFilm', upload.single('image'), (req, res) => {
    const film = {
        titre: req.body.titre,
        réalisateur: req.body.réalisateur,
        année: req.body.année,
        salle: req.body.salle,
        horaire: req.body.horaire,
        langue: req.body.langue,
        image: req.file.path // Chemin de l'image
    };

    filmsCollection.insertOne(film)
        .then(result => {
            console.log('Film ajouté avec l\'ID :', result.insertedId);
            res.redirect('/'); // Redirige vers la page d'accueil
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout du film :', error);
            res.status(500).send('Erreur lors de l\'ajout du film');
        });
});

// Afficher les films
app.get('/filmsList', (req, res) => {
    filmsCollection.find().toArray()
        .then(films => {
            res.json(films);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des films :', error);
            res.status(500).send('Erreur lors de la récupération des films');
        });
});

// Modifier un film
app.post('/modifierFilm/:id', upload.single('image'), (req, res) => {
    const filmId = req.params.id;

    const updatedFilm = {
        titre: req.body.titre,
        réalisateur: req.body.réalisateur,
        année: req.body.année,
        salle: req.body.salle,
        horaire: req.body.horaire,
        langue: req.body.langue,
        image: req.file ? req.file.path : req.body.image // Met à jour l'image si une nouvelle est fournie
    };

    filmsCollection.updateOne({ _id: new ObjectId(filmId) }, { $set: updatedFilm })
        .then(result => {
            console.log('Film modifié avec l\'ID :', filmId);
            res.redirect('/'); // Redirige vers la page d'accueil
        })
        .catch(error => {
            console.error('Erreur lors de la modification du film :', error);
            res.status(500).send('Erreur lors de la modification du film');
        });
});

// Supprimer un film
app.post('/supprimerFilm/:id', (req, res) => {
    const filmId = req.params.id;

    filmsCollection.deleteOne({ _id: new ObjectId(filmId) })
        .then(result => {
            console.log('Film supprimé avec l\'ID :', filmId);
            res.redirect('/'); // Redirige vers la page d'accueil
        })
        .catch(error => {
            console.error('Erreur lors de la suppression du film :', error);
            res.status(500).send('Erreur lors de la suppression du film');
        });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré à http://localhost:${port}`);
});
