const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const kundenRoutes = require('./routes/kunden');
const kontenRoutes = require('./routes/konten');
const { errorHandler, notFound } = require('./middleware/errorHandler');

require('colors');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());

app.use(express.json());

app.use('/kunden', kundenRoutes);
app.use('/konten', kontenRoutes);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT);
