const getSongs = (id,res,db) => {
    db.query(
        `SELECT
        s.song_id, s.name AS title, s.length,
        al.cover_img AS img, al.name AS album_name,
        ar.name AS artist_name,
        SUM(i.play_count) AS plays, i.is_liked,
        SUM(TIME_TO_SEC(s.length)) AS total_length        
        FROM playlists AS p 
        LEFT JOIN songs_by_playlist as sp
        on p.playlist_id = sp.playlist_id
        JOIN songs AS s
        ON s.song_id = sp.song_id
        LEFT JOIN albums AS al
        ON al.album_id = s.album
        JOIN artists  ar
        ON ar.artist_id = s.artist
        LEFT JOIN interactions AS i
        ON s.song_id= i.song_id
        WHERE p.playlist_id = '${id}'
        GROUP BY s.song_id
        ;
        `,
        (err,results,fields) => {
            if(err){
                throw err
            }
            res.send(results)
        }
    )
}
module.exports=getSongs
