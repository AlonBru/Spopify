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

const query = (sql,data) => {
  return new Promise( (resolve, reject) => {
    pool.query(
      sql,
      data,
      (err, result) => {
      if (err) reject(err)
      resolve(result);
      }
    );
  });
};

const getById = require('../queries/getById')
// const getAll = require('../queries/getAll')
const getTop = require('../queries/getTop')
const getByArtist = require('../queries/getByArtist')
// const search = require('../queries/search')
const Like = require('../queries/Like')
const getByAlbum = require('../queries/getByAlbum')
const getByPlaylist = require('../queries/getByPlaylist');
const elastic = require('./elastic');

const db = {}

const elasticQuery = {
  artist: `SELECT
  artist_id as id, name, img 
  from artists
  `,
  album:`SELECT
  al.album_id as id, al.name, al.cover_img as img, ar.name AS artist
  FROM albums AS al
  Join artists AS ar
  ON al.artist = ar.artist_id
  `,
  song : `SELECT
  s.song_id as id, s.name,
  cover_img as img,
  ar.name AS artist
  FROM songs AS s
  Join artists AS ar
  ON s.artist = ar.artist_id
  LEFT Join albums AS al
  ON s.album = al.album_id
  `,
  playlist: `SELECT
  playlist_id as id, p.name, cover_img as img, u.username AS user
  FROM playlists AS p
  Join users AS u
  ON p.created_by = u.user_id
  `
 
}

db.getSearchData = {
  artists : () => {
    return query(elasticQuery.artist)
  },
  albums : () => {
    return query(elasticQuery.album)
  },
  songs : () => {
   return query(elasticQuery.song)
  },
  playlists : () => {
   return query(elasticQuery.playlist)
  }
}

db.search = {
  all: function (search) {
    return Promise.all(
      this.song(),
      this.album(),
      this.artist(),
      this.playlist()
      
    )
  },
  song: (search) => {
    const sql =`
    SELECT s.name, s.song_id AS id,
    cover_img AS img, s.album,
    ar.name AS artist_name
    FROM
    (SELECT songs.*
    from songs
    WHERE songs.name LIKE '${search}%'
    UNION (Select *
    FROM songs
    WHERE name LIKE '% ${search}%')
    UNION (Select * 
    from  songs
    WHERE name LIKE '_${search}%')
    ) AS s
    LEFT Join albums
    ON s.album = album_id
    Join artists as ar
    ON ar.artist_id = s.artist
    `
    return query(sql)
  },
  artist: (search) => {
    const sql =`
      SELECT name, artist_id as id, img
        FROM (SELECT *
        from Artists
        WHERE name LIKE '${search}%'
      UNION (Select *
        FROM artists
        WHERE name LIKE '% ${search}%')
      UNION (Select * 
        from  artists
        WHERE name LIKE '_${search}%')) AS al
    `
    return query(sql)
  },
  album: (search) => {
    sql = `
      SELECT al.name, cover_img AS img,
        album_id as id,
        ar.name AS artist_name
      FROM (SELECT * 
          from Albums
          WHERE name LIKE '${search}%'
        UNION (Select *
          FROM albums
          WHERE name LIKE '% ${search}%')
        UNION (Select * 
          from  albums
          WHERE name LIKE '_${search}%')) as al
      Join artists as ar
        ON ar.artist_id = al.artist
    `
    return query(sql)
  },
  playlist: (search) => {
    const sql =`
      SELECT p.name, playlist_id AS id,
        cover_img AS img, nickname AS artist_name
        FROM (SELECT * from Playlists
        WHERE name LIKE '${search}%'
      UNION (Select *
        FROM playlists
        WHERE name LIKE '% ${search}%')
      UNION (Select * 
        from  playlists
        WHERE name LIKE '_${search}%')) as p
      Join users
        ON p.created_by = users.user_id
    `
    return query(sql)
  }
}
db.findItem = {
  song: ({name,youtube_link,artist}) => {
  const sql = elasticQuery.song+`
    WHERE
    s.name = '${name}' 
    AND
    youtube_link = '${youtube_link}'
    AND
    s.artist = '${artist}'
  `
  return query(sql)
  },
  album: ({name,cover_img,artist}) => {
  const sql = elasticQuery.album+`
    WHERE
    al.name = '${name}' 
    AND
    cover_img = '${cover_img}'
    AND
    al.artist = '${artist}'
  `
  return query(sql)
  },
  artist: ({name,img}) => {
  const sql = elasticQuery.artist+`
    WHERE
    name = '${name}' 
    AND
    img = '${img}'
  `
  return query(sql)
  },
  playlist: ({name,cover_img,created_by}) => {
  const sql = elasticQuery.playlist+`
    WHERE
    name = '${name}' 
    AND
    cover_img = '${cover_img}'
    AND
    created_by = '${created_by}'
  `
  return query(sql)
  }
}

// db.addToPlaylist = (song,playlist) => {
//     console.log(song,playlist)
//     return query(
//         `
//         INSERT INTO songs_by_playlist
//         (song_id,
//         playlist_id)
//         VALUES
//         (?,?);
//         `)
        
    
// }

db.getFields =(req, res,db) => {
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

// db.getAlbum =(req, res) => {
//     const {id} = req.params
//     const sql = `SELECT * FROM albums WHERE album_id=${id}`
//     query(sql)
//     .then(

//       (err, album, fields) => {
//         if (err) {
//           console.error(err)
//           console.log('error from getAlbum')
//           res.send(err.message)
//           return;
//         };
//         db.query(
//           `select * from songs
//           where songs.album = ${album[0].album_id}`, (err,songs,fields)=>{
//             if (err) {
//               console.error(err)
//               console.log('error from getAlbum')
//               res.send(err.message);
//               return
//             };
//             res.json({album,songs})
//           }
//           )
//           )
//         }); 
// }
db.searchArtist =(req, res,db) => {
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
db.searchAll = (req, res,db) => {
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
db.addNew =(index,body) => {

  const sql = `INSERT INTO \`${index}s\` 
  set ?`
  return query(
      sql,
      [body]
      ); 
}
db.updateById = (req,res,db) => {
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
db.deleteById = (req,res,db) => {
    const {id,target} =req.params;
    db.query(
        `DELETE FROM \`${target}s\` 
        WHERE \`(${target}_id\` = '${id}');`,
        (err,results,fields)=>{
            if(err){throw err}
            res.send(`deleted ${target} with id ${id}`)
    })
}

module.exports =db