const express = require('express');
require('dotenv').config()
const elastic = require('./routes/elastic');
const migrate = require('./routes/elastic');
const sql = require('./routes/sql');
const app = express();

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

app.use(express.json());
app.use(logger);

app.get('/ping',(req,res) => {
    res.send({status:'success',message:'pong!'})
})

app.use('/elastic',elastic)
app.use('/api',sql)

module.exports = app