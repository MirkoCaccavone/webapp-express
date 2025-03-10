// importiamo il modulo express
const express = require('express')
const app = express()
const port = 3000



// Gestisce la route principale ('/')
app.get('/', (req, res) => {
    res.send("Server di webapp-express")
});

// avviamo il router sulla porta specificata
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})