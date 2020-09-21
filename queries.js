const getById = require('./queries/getById')
const getAll = require('./queries/getAll')
const getTop = require('./queries/getTop')
const getByArtist = require('./queries/getByArtist')
const search = require('./queries/search')
const Like = require('./queries/Like')
const getByAlbum = require('./queries/getByAlbum')
const getByPlaylist = require('./queries/getByPlaylist')

const addToPlaylist = (song,playlist,res,db) => {
    console.log(song,playlist)
    db.query(
        `
        INSERT INTO songs_by_playlist
        (song_id,
        playlist_id)
        VALUES
        (?,?);
        `,[song,playlist],(err, results, fields) => {
            if (err) {
                console.error(err)
                res.send(err.message)
                return
            };
            res.send('success');
          })
    
}

const getFields =(req, res,db) => {
    const {target} = req.params
    db.query(
        `SELECT * FROM ${target}s WHERE ${target}_id=1`,
     (err, results, fields) => {
        if (err) {
            console.error(err)
            console.log('error from getFields')
            return
        };
        console.log(`got fields for ${target}s`)
        res.send(fields.map(column=>column.name));
      }); 
    }

const getAlbum =(req, res,db) => {
    const {id} = req.params
    db.query( `SELECT * FROM albums WHERE album_id=${id}`,
     (err, album, fields) => {
        if (err) {
            console.error(err)
            console.log('error from getAlbum')
            res.send(err.message)
            return;
        };
        db.query(
            `select * from songs
            where songs.album = ${album[0].album_id}`, (err,songs,fields)=>{
                if (err) {
                    console.error(err)
                    console.log('error from getAlbum')
                    res.send(err.message);
                    return
                };
                res.json({album,songs})
            }
        )
    }); 
}
const searchArtist =(req, res,db) => {
    const target = 'artist'
    const {search} = req.query
    db.query(`SELECT artist_id AS id,name, img 
    FROM \`${target}\`s 
    WHERE name LIKE '%${search}%'`,
    (err, results, fields) => {
        if (err) {
            console.error(err)
            console.log('error from searchArtist')
            res.send(err.message);
            return
        };
        res.send(results);
    }); 
}
const searchAll = (req, res,db) => {
    const target = 'artist'
    const {search} = req.query
    db.query(`SELECT artist_id AS id,name, img 
    FROM ${target}s 
    WHERE name LIKE '%${search}%'`,
    (err, results, fields) => {
        if (err) {
            console.error(err)
            console.log('error from searchAll')
            res.send(err.message);
            return
        };
        res.send(results);
    }); 
}
const addNew =(req, res,db) => {
    const {target} = req.params
    const {body}= req
    body.uploaded_at = new Date
    db.query(
        `INSERT INTO \`${target}s\` 
        set ?`,
        [body],
        (err, results, fields) => {
            if (err) {
                console.error(err.message)
                res.send({status:'error',message:err.message});
                return
            };
        console.log(`added ${target} '${body.name}'`)
        res.send({status:'success',message:body.name+' added!'});
    }); 
}
const updateById = (req,res,db) => {
    const {id,target} =req.params;
    const {body} =req;
    // receives an array of strings ['column=value'] 
    body.forEach(ele=>{
    db.query(
        `UPDATE \`${target}\` SET ? 
        WHERE artist_id='${id}' `,
        [ele],(err,results,fields)=>{
            if(err){throw err}
            res.send('updated'+id)
        })
    })
}
const deleteById = (req,res,db) => {
    const {id,target} =req.params;
    db.query(
        `DELETE FROM \`${target}s\` 
        WHERE \`(${target}_id\` = '${id}');`,
        (err,results,fields)=>{
            if(err){throw err}
            res.send(`deleted ${target} with id ${id}`)
    })
}
module.exports ={
    getAll,
    getById,
    getTop,
    getByArtist,
    Like,
    search,
    getByAlbum,
    getByPlaylist,
    addToPlaylist,
    updateById,
    deleteById,
    addNew,
    getFields,
    searchArtist,
    getAlbum
}