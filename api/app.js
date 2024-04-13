require('dotenv').config()

const express = require('express');
const logger = require('morgan')

require('./configs/db.config')

const app = express();

app.use(logger('dev'));
app.use(express.json())

const router = require('./configs/routes.configs')
app.use('/api', router);



app.listen(3000, () => console.info('Application running'));