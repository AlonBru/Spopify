const e = require("express")

const getAll =(req, res,db) => {
    const {target} = req.params
    const page = req.query.page||0
    console.log(req.query)
    console.log(page)
    db.query(
        `SELECT * FROM ${target}s 
        LIMIT 20 OFFSET ${page*20}`,
     (err, results, fields) => {
        if (err) {

            console.error(err)
            console.log('error from getAll')
            return
        };
        console.log(`got ${target}s`+page>0?` page ${page}`:'')
        res.send({results:results,fields:fields.map(field=>field.name)});
      }); 
    }
const topSongs =(req, res,db) => {
    const page = req.query.page||0
    db.query(
        `SELECT 
        s.song_id AS id, s.name as name, 
        al.cover_img AS img,
        sum(i.play_count) AS plays  
        FROM songs AS s
        LEFT JOIN interactions AS i
        ON s.song_id = i.song_id
        Join albums As al
        ON s.album=al.album_id
        GROUP BY s.song_id 
        LIMIT 20 OFFSET ${page*20};`,
     (err, results, fields) => {
        if (err) {
            console.error(err);
            console.log('error from topSongs')
            return
        }
        console.log(`got top songs`+page>0?` page ${page}`:'')
        res.send({results:results,fields:fields.map(field=>field.name)});
      }); 
    }
const topAlbums =(req, res,db) => {
    const page = req.query.page||0
    db.query(
        `SELECT 
        al.album_id AS id, al.name as name, al.cover_img AS img,
         sum(i.play_count) AS plays  
         FROM songs AS s
         JOIN interactions AS i
         ON s.song_id = i.song_id
         Join albums As al
         ON s.album=al.album_id
         GROUP BY al.name 
         LIMIT 20 OFFSET ${page*20};`,
     (err, results, fields) => {
        if (err) {
            console.error(err)
            console.log('error from topAlbum')
            return
        };
        console.log(`got top albums`+page>0?` page ${page}`:'')
        res.send({results:results,fields:fields.map(field=>field.name)});
      }); 
    }
const topArtists =(req, res,db) => {
    const page = req.query.page||0
    db.query(
        `SELECT 
        ar.artist_id AS id, ar.name as name, ar.img AS img,
         sum(i.play_count) AS plays  
         FROM songs AS s
         JOIN interactions AS i
         ON s.song_id = i.song_id
         Join artists As ar
         ON s.album=ar.artist_id
         GROUP BY ar.name 
         LIMIT 20 OFFSET ${page*20};`,
     (err, results, fields) => {
        if (err) {
            console.error(err)
            console.log('error from topArtists')
            return
        };
        console.log(`got top Artists`+page>0?` page ${page}`:'')
        res.send({results:results,fields:fields.map(field=>field.name)});
      }); 
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
const getById =(req, res,db) => {
    const {target,id} = req.params
    console.log('id', id, 'target',target)
    let sql = [
        `SELECT * FROM ${target}s`,
        '',
        `WHERE ${target}_id='${id}' OR name LIKE '%${id}%' `
    ]
    switch(target){
        case 'song':
            sql[1]=
            `LEFT JOIN(
                SELECT album_id, ar.name AS artist_name,
                al.name AS album_name
                from artists AS ar
                JOIN albums AS al
                ON al.artist = ar.artist_id
            ) AS a
            On a.album_id = ${target}s.album`
            break;
        case 'album':
            sql[1]=
            `JOIN (
                SELECT artist_id, name AS artist_name from artists) AS a
            On a.artist_id = ${target}s.artist`
            break;
    }

    db.query( sql.join(' '), (err, results, fields) => {
        if (err) {
            console.error(err)
            console.log('error from getFields')
            res.send(err.message);
            return
        };
        console.log(`got ${target} with id ${id}`)
        res.send(results);
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
    FROM ${target}s 
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
    db.query(`INSERT INTO ${target}s 
    set ?`,[body], (err, results, fields) => {
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
        `UPDATE ${target} SET ? 
        WHERE artist_id=${id} `,[ele],(err,results,fields)=>{
            if(err){throw err}
            res.send('updated'+id)
        })
    })
}
const deleteById = (req,res,db) => {
    const {id,target} =req.params;
    db.query(
        `DELETE FROM ${target}s WHERE (${target}_id = ${id});`,
        (err,results,fields)=>{
            if(err){throw err}
            res.send(`deleted ${target} with id ${id}`)
    })
}
module.exports ={
    updateById,
    deleteById,
    getAll,
    getById,
    addNew,
    getFields,
    searchArtist,
    topSongs,
    topAlbums,
    topArtists,
    getAlbum
}