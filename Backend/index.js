const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/quotes', require('./routes/quotes'))


app.listen(port, () => {
    console.log(`Stormofthoughts backend listening on port ${port}` );
})