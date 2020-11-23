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
        `SELECT s.*, 
        SUM(i.play_count) AS play_count,
        al.cover_img AS img, al.name AS album_name,
        ar.name AS artist_name
        FROM songs AS s
        LEFT JOIN interactions as i
        on s.song_id = i.song_id AND user_id=1
        LEFT JOIN albums AS al
        ON al.album_id = s.album
        JOIN artists  ar
        ON ar.artist_id = s.artist
        WHERE s.song_id = '${id}'
        GROUP BY s.song_id
        `,
        (err,results,fields) => {
            if(err){
                throw err
            }
            res.send(results)
        }
    )
}
const playlist = (id, res,db) => {
    db.query(
        `SELECT p.*, SUM(i.play_count) AS play_count,
        u.nickname AS user, an.total_length  
        FROM playlists AS p
        LEFT JOIN playlist_interactions as i
        on p.playlist_id = i.playlist_id
        JOIN users as u
        on u.user_id = p.created_by
        Join(SELECT SUM(TIME_TO_SEC(s.length)) AS total_length
            from playlists as p
            left join songs_by_playlist as sp
            on p.playlist_id = sp.playlist_id
            join songs as s 
            ON sp.song_id = s.song_id
            where p.playlist_id ='${id}'
            Group by p.playlist_id) AS an
        WHERE p.playlist_id = '${id}'
        Group BY p.playlist_id
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