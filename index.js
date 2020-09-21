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
//search
app.get('/search/:target/:search',(req,res)=>{
    const {target,search} = req.params;
    queries.search[target](search,res,db)
})

// old search (used in adder page)
// app.get('/search/artist',(req,res)=> {
//     queries.searchArtist(req,res,db)
// })
//get the column names 

app.get('/fields/:target', (req,res) => {
    queries.getFields(req,res,db)
})

// get target by (e.g songs by artist) 
app.get('/getByArtist/:target', (req,res) => {
    const {target} = req.params
    const {page,id} = req.query
    queries.getByArtist[target](id,page,res,db)
})
app.get('/getByAlbum/songs', (req,res) => {
    const {id} = req.query
    console.log('getByAlbum', id)
    queries.getByAlbum(id,res,db)
})
app.get('/getByPlaylist/songs', (req,res) => {
    const {id} = req.query
    console.log('getByPlaylist', id)
    queries.getByPlaylist(id,res,db)
})

// get top 20 of target (define a query ?page=0,1,2,3 for the next 20)
app.get('/top_:target',(req,res) => {
    const {target} = req.params;
    const page = Math.abs(req.query.page)||0;
    queries.getTop[target](page,res,db)
})

//get by id
app.get('/:target/:id', (req, res) => {
    const {target, id} = req.params;
    console.log('getById',target,id)
    queries.getById[target](id,res,db)
});

// get all of target, 20 at a page (define a query ?page=0,1,2,3 for the next 20)
app.get('/:target', (req, res) => {
    const page =Math.abs(req.query.page)||0;
    const {target} =req.params;
    queries.getAll[target](page,res,db)
});
// add song to playlist
app.post('/songToPlaylist',(req,res) => {
    const {song,playlist}= req.query;
    queries.addToPlaylist(song,playlist,res,db)
})
// add an entry
app.post('/:target',(req,res) => {
    queries.addNew(req,res,db)
})
//update an "un/like"
app.put('/setLike/:target/:id',(req,res) => {
    let data= [
        {created_at:(new Date),is_liked:req.body.like},{is_liked:req.body.like}]
    const {target,id} = req.params
    queries.Like[target](id,data,res,db)
})
//update an entry
app.put('/:target/:id',(req,res) => {
    queries.updateById(req,res,)
})
//delete an entry
app.delete('/:target/:id',(req,res) => {
    queries.deleteById(req,res,db)
})

app.get('/',(req,res)=>{
    console.log('nothing caught')
    // res.send()
})

const port = process.env.PORT
app.listen(port,()=>{
        console.log(`server running on port ${port}`)
})