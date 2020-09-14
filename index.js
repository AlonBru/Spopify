const express = require('express');
require('dotenv').config()
const mysql = require('mysql');
const queries = require('./queries');

const app = express();

app.use(express.json());
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

let db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

db.connect(err => {
    if (err) throw err;
    console.log("MYSQL Connected!");
});

app.get('/ping',(req,res) => {
    res.send({status:'success',message:'pong!'})
})
app.get('/search/artist',(req,res)=> {
    queries.searchArtist(req,res,db)
})
//get the column names 
app.get('/fields/:target', (req,res) => {
    queries.getFields(req,res,db)
})
// get top 20 (define a query ?page=0,1,2,3 for the next 20)
app.get('/top_songs',(req,res) => {
    queries.topSongs(req,res,db)
})
//get by id
app.get('/:target/:id', (req, res) => {
    console.log('getbyid')
    queries.getById(req,res,db)
});
// get top 20 (define a query ?page=0,1,2,3 for the next 20)
app.get('/:target', (req, res) => {
    queries.getAll(req,res,db)
});
// add an entry
app.post('/:target',(req,res) => {
    queries.addNew(req,res,db)
})
//update an entry
app.put('/:target/:id',(req,res) => {
    queries.updateById(req,res,)
})
//delete an entry
app.delete('/:target/:id',(req,res) => {
    queries.deleteById(req,res,db)
})



const port = process.env.PORT
app.listen(port,()=>{
        console.log(`server running on port ${port}`)
})