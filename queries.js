const getAll =(req, res,db) => {
    const {target} = req.params
    const page = req.query.page||0
    console.log(req.query)
    console.log(page)
    db.query(
        `SELECT * FROM ${target}s 
        ORDER BY likes_number DESC 
        LIMIT 20 OFFSET ${page*20}`,
     (err, results, fields) => {
        if (err) {console.error(err)};
        console.log(`got ${target}s`+page>0?` page ${page}`:'')
        res.send({results:results,fields:fields.map(field=>field.name)});
      }); 
    }
const topSongs =(req, res,db) => {
    const page = req.query.page||0
    db.query(
        `SELECT s.name, sum(play_count) AS plays  FROM songs AS s
        JOIN interactions AS i
        ON s.song_id = i.song_id
        GROUP BY s.song_id 
        LIMIT 20 OFFSET ${page*20};`,
     (err, results, fields) => {
        if (err) {console.error(err)};
        console.log(`got top songs`+page>0?` page ${page}`:'')
        res.send({results:results,fields:fields.map(field=>field.name)});
      }); 
    }//TODO make it work by play_count
const topAlbums =(req, res,db) => {
    const page = req.query.page||0
    db.query(
        `SELECT al.album_id, al.name, ar.name AS artist, sum, count(s.name) AS 'number of songs'
        FROM albums AS al
        Join (
            SELECT s.name, s.album, sum(play_count) AS sum 
            FROM songs AS s
            Join interactions AS i
            on s.song_id=i.song_id
            group by s.song_id
        ) AS s
        on al.album_id=s.album
        JOIN artists as ar
        ON al.artist = ar.artist_id
        GROUP BY al.album_id; 
        LIMIT 20 OFFSET ${page*20};`,
     (err, results, fields) => {
        if (err) {console.error(err)};
        console.log(`got top albums`+page>0?` page ${page}`:'')
        res.send({results:results,fields:fields.map(field=>field.name)});
      }); 
    }//TODO make it work by play_count

const getFields =(req, res,db) => {
    const {target} = req.params
    db.query(
        `SELECT * FROM ${target}s WHERE ${target}_id=1`,
     (err, results, fields) => {
        if (err) {console.error(err)};
        console.log(`got fields for ${target}s`)
        res.send(fields.map(column=>column.name));
      }); 
    }
const getById =(req, res,db) => {
    const {target,id} = req.params
    console.log('id', id, 'traget',target)
    db.query(
        `SELECT * 
        FROM ${target}s 
        WHERE name LIKE '%${id}%' OR ${target}_id='${id}' 
        `,
    (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        console.log(`got ${target} with id ${id}`)
        res.send(results);
    }); 
}
const searchArtist =(req, res,db) => {
    const target = 'artist'
    const {search} = req.query
    db.query(`SELECT artist_id AS id,name, img FROM ${target}s 
    WHERE name LIKE '%${search}%'`,
    (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.send(results);
    }); 
}
const addNew =(req, res,db) => {
    const {target} = req.params
    const {body }= req
    body.uploaded_at = new Date
    db.query(`INSERT INTO ${target}s 
    set ?`,[body], (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        console.log(`added ${target} '${body.name}'`)
        // res.status(200);
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
    // topArtists
}