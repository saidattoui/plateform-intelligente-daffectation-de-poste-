const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

// create express app
const app = express();
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Rest API."});
});

require('./app/routes/admin.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/info_per.routes.js')(app);
require('./app/routes/info_pro.routes.js')(app);
require('./app/routes/diplome.routes.js')(app);
require('./app/routes/langue.routes.js')(app);
require('./app/routes/competence.routes.js')(app);
require('./app/routes/projet.routes.js')(app);
require('./app/routes/centres_interet.routes.js')(app);
require('./app/routes/recruteur.routes.js')(app);
require('./app/routes/entreprise.routes.js')(app);
require('./app/routes/offre.routes.js')(app);
require('./app/routes/postule.routes.js')(app);
require('./app/routes/pub.routes.js')(app);
require('./app/routes/favori.routes.js')(app);
require('./app/routes/recommendation.routes.js')(app);




// listen for requests
app.listen(3000, "127.0.0.1",  () => {
    console.log("Server is listening on port 3000");
});