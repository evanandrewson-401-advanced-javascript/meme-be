const express = require('express');
const app = express();

app.use(express.json());

//set up routes

app.use(require('./middleware/api-404'));
app.use(require('./middleware/check-connection'));
app.use(require('./middleware/error-handler'));

module.exports = app;