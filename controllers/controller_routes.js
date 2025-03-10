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

        res.json(results);
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

        const movie = results[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {

            if (err) return res.status(500).json({ error: 'Database query failed' });
            // aggiorniamo con le review ritornate
            movie.reviews = reviewResult;
            // ritorniamo l'oggetto completo
            res.json(movie);
        });
    })
}

module.exports = { index, show }