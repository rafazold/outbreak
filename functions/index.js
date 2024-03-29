const functions = require("firebase-functions");

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {port} = require('./config');
require("./models");

const app = express();


app.use(express.static('public'));

app.use(morgan('combined'));
app.use(cors({
    origin: true,
    credentials: true
}));
// url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-12-2020.csv';


app.use(bodyParser.json());



require('./routes/country')(app);
require('./routes/story')(app);
require('./routes/current')(app);

app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).send('Something broke!') })

app.listen(port, () => console.log(`App listening on port ${port}!`));

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
