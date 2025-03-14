// importiamo il file di connessione al database
const connection = require('../data/movie_db');

// funzione INDEX
function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM movies'

    // eseguiamo la query
    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({ error: 'Database query failed' });

        // versione mappata del risultato
        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })
        res.json(movies);
    });
}

// funzione SHOW
function show(req, res) {
    // recuperiamo l'id o
    const { id } = req.params;

    // prepariamo le query
    const detailMovie = `SELECT * FROM movies WHERE movies.id = ?`;

    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ?`;


    // eseguiamo la query per mostrare un singolo film
    connection.query(detailMovie, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' })

        // versione mappata del risultato
        const movie = {
            ...results[0],
            image: req.imagePath + results[0].image
        };


        connection.query(reviewSql, [id], (err, reviewResult) => {

            if (err) return res.status(500).json({ error: 'Database query failed' });
            // aggiorniamo con le review ritornate
            movie.reviews = reviewResult;
            // ritorniamo l'oggetto completo
            res.json(movie);
        });
    })
}

function store(req, res, next) {
    // recuperiamo le altre info
    const { title, director, abstract } = req.body;

    // gestiamo ilvalore del nome file creato dal middleware
    const imageName = `${req.file.filename}`;

    // creiamo la query
    const query = "INSERT INTO movies (title, director,image, abstract) VALUES (?,?,?,?)";

    // eseguiamo la query per aggiungere una rescensione
    connection.query(query, [title, director, imageName, abstract], (err, results) => {

        if (err) return next(new Error("Errore interno del server"));
        res.status(201);
        res.json({ message: "film aggiunto con successo" })
    });
}

// inserimento nuova review
function storeReview(req, res) {
    // recuperiamo l'id 
    const { id } = req.params;

    // recuperiamo le altre info
    const { name, vote, text } = req.body;

    // prepariamo le query
    const insertReviewSql = `INSERT INTO reviews (text, name, vote, movie_id) VALUES (?,?,?,?)`;

    // eseguiamo la query per aggiungere una rescensione
    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {

        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId })
    });
}

module.exports = { index, show, store, storeReview }