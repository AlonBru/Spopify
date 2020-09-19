const artist = (id, res,db) => {
    db.query(
        `SELECT ar.*, SUM(i.play_count) AS play_count
        FROM artists AS ar
        LEFT JOIN songs AS s
        ON s.artist = ar.artist_id
        LEFT JOIN interactions as i
        on s.song_id = i.song_id
        WHERE ar.artist_id = '${id}'
        GROUP BY artist_id`,
        (err,results,fields) => {
            if(err){
                throw err
            }
            res.send(results)
        }
    )
}
const album = (id, res,db) => {
    db.query(
        `SELECT al.album_id, al.name, al.cover_img, al.released,
        ar.name as artist, ar.artist_id,
        SUM(TIME_TO_SEC(s.length)) AS total_length
        FROM albums AS al
        Join artists AS ar
        on al.artist = ar.artist_id
        JOIN songs AS s
        on s.album = al.album_id
        WHERE album_id = '${id}';
        `,(err,results,fields) => {
            if(err){
                throw err
            }
            res.send(results)
        }
    )
}
const song = (id, res,db) => {
    db.query(
        `SELECT s.*, SUM(i.play_count) AS play_count
        FROM songs AS s
        LEFT JOIN interactions as i
        on s.song_id = i.song_id
        WHERE s.song_id = '${id}'
        `,
        (err,results,fields) => {
            if(err){
                throw err
            }
            res.send(results)
        }
    )
}
//TODO Unimplemented
const playlist = (id, res,db) => {
    db.query(
        `SELECT p.*, SUM(i.play_count) AS play_count
        FROM playlists AS p
        LEFT JOIN playlist_interactions as i
        on p.playlist_id = i.playlist_id
        WHERE p.playlist_id = '${id}'
        `,
        (err,results,fields) => {
            if(err){
                throw err
            }
            res.send(results)
        }
    )
}

module.exports={artist,album,song,playlist}