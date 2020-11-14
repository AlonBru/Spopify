const mysql = require('mysql');
const dbConfig = {
  connectionLimit: 10, // default 10
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
};
const pool = mysql.createPool(dbConfig)
const query = (sql) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getById = require('../queries/getById')
const getAll = require('../queries/getAll')
const getTop = require('../queries/getTop')
const getByArtist = require('../queries/getByArtist')
const search = require('../queries/search')
const Like = require('../queries/Like')
const getByAlbum = require('../queries/getByAlbum')
const getByPlaylist = require('../queries/getByPlaylist')

const getAll = {
  artists : async (req) => {
    const sql = `SELECT
    artist_id as id, name, img 
    from artists
    `
    return query(sql)
    
  },
  albums : async (req) => {
    const sql = `SELECT
    al.album_id as id, al.name, al.cover_img, ar.name AS artist
    FROM albums AS al
    Join artists AS ar
    ON al.artist = ar.artist_id
    `
    return query(sql)
  },
  songs : async (req) => {
    const sql = `SELECT
    s.song_id as id, s.name, al.cover_img, ar.name AS artist
    FROM songs AS s
    Join artists AS ar
    ON s.artist = ar.artist_id
    Join albums AS al
    ON s.album = al.album_id
    `
    return query(sql)
  }
}
    
const addToPlaylist = (song,playlist) => {
    console.log(song,playlist)
    return query(
        `
        INSERT INTO songs_by_playlist
        (song_id,
        playlist_id)
        VALUES
        (?,?);
        `)
        
    
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