// importiamo il modulo express
const express = require('express')
const app = express()
const port = 3000


// registro il body-parser per "application/json"
// interpreta quello che sarà passato come file JSON
app.use(express.json());

// importo il router
const postsRouter = require('./routers/routes');

// Usa il router per le richieste alla route '/posts'
app.use("/api/movies", postsRouter)

// Serve i file statici dalla cartella 'public'
app.use(express.static('public'));

// Gestisce la route principale ('/')
app.get('/api', (req, res) => {
    res.send("Server di webapp-express")
});

// avviamo il router sulla porta specificata
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})