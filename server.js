// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('./public'))

// Setup Server
const port = 3600;
app.listen(port, () => {
    console.log(`server is running on localhost:${port}`)
})

// POST request
app.post('/addweather', (req, res) => {
    projectData = req.body
    res.send()
});

// GET request
app.get('/all', (req, res) => {
    res.send(projectData)
})