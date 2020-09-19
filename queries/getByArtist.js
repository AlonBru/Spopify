const songs =(id,page,res,db) => {
        db.query(
            `SELECT
            s.song_id,s.name AS title, s.length,
            cover_img AS album_cover,
            SUM(i.play_count) AS plays
            FROM songs AS s
            LEFT JOIN interactions as i
            on s.song_id = i.song_id
            LEFT JOIN albums as al
            on s.album = al.album_id
            WHERE s.artist = ' ${id} '
            GROUP BY s.song_id
            Order BY plays DESC
            LIMIT 20;
            `,
            (err,results,fields) => {
                if(err){
                    throw err
                }
                res.send(results)
            }
        )
    }
const albums = (id,page,res,db) => {
    db.query(
        `SELECT *
        FROM albums 
        WHERE artist = '7'
        Order BY released DESC;
        `,
         (err, results, fields) => {
            if (err) {
                console.error(err);
                return
            }
            res.send(results);
    }); 
}
const playlist =(page, res,db) => {
 // unimplemented
}
module.exports={albums,songs,playlist}