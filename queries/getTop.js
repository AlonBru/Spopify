const song =(page, res,db) => {
    db.query(
        `SELECT 
        s.song_id AS id, s.name as name, 
        al.cover_img AS img,
        sum(i.play_count) AS play_count  
        FROM songs AS s
        LEFT JOIN interactions AS i
        ON s.song_id = i.song_id
        Join albums As al
        ON s.album=al.album_id
        GROUP BY s.song_id 
        ORDER BY play_count DESC
        LIMIT 20 OFFSET ${page*20};
        `,
     (err, results, fields) => {
        if (err) {
            console.error(err);
            return
        }
        res.send({results});
      }); 
    }
const album =(page, res,db) => {
    db.query(
        `SELECT 
        al.album_id AS id, al.name as name, al.cover_img AS img,
         sum(i.play_count) AS play_count  
         FROM songs AS s
         JOIN interactions AS i
         ON s.song_id = i.song_id
         RIGHT Join albums As al
         ON s.album=al.album_id
         GROUP BY al.name
         ORDER BY play_count DESC
         LIMIT 20 OFFSET ${page*20};`,
         (err, results, fields) => {
            if (err) {
                console.error(err);
                return
            }
            res.send({results});
    }); 
}
const artist =(page, res,db) => {
    db.query(
        `SELECT 
        ar.artist_id AS id, ar.name as name, ar.img AS img,
         sum(i.play_count) AS play_count  
         FROM songs AS s
         JOIN interactions AS i
         ON s.song_id = i.song_id
         RIGHT JOIN artists As ar
         ON s.album=ar.artist_id
         GROUP BY ar.name 
         ORDER BY play_count DESC
         LIMIT 20 OFFSET ${page*20};`,
         (err, results, fields) => {
            if (err) {
                console.error(err);
                return
            }
            res.send({results});
    }); 
}
const playlist =(page, res,db) => {
    db.query(
        `SELECT 
        p.artist_id AS id, p.name as name, p.cover_img AS img,
         sum(i.play_count) AS play_count  
         FROM playlists AS p
         LEFT JOIN playlist_interactions AS i
         ON p.playlist_id = i.playlist_id
         GROUP BY p.name
         ORDER BY play_count DESC
         LIMIT 20 OFFSET ${page*20};
         `,
         (err, results, fields) => {
            if (err) {
                console.error(err);
                return
            }
            res.send({results});
    }); 
}
module.exports={artist,album,song,playlist}