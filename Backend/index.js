const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();

const express = require('express')
const app = express()
const port = 5000


app.use(cors())
app.use(express.json())
// Avavible routes

app.use('/api/auth',require('./Routess/auth.js'));
app.use('/api/notes',require('./Routess/notes.js'));

app.listen(port, () => {
  console.log(`InoteBook backend listening on port ${port}`)
})