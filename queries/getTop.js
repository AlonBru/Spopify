const song =(page, res,db) => {
    db.query(
        `SELECT 
        s.song_id AS id, s.name as name, 
        al.album_id, al.cover_img AS img,
        sum(i.play_count) AS play_count,
        ar.name AS artist, ar.artist_id
        FROM songs AS s
        LEFT JOIN interactions AS i
        ON s.song_id = i.song_id
        Join albums As al
        ON s.album=al.album_id
        JOIN artists as ar
        ON ar.artist_id = al.artist
        GROUP BY s.song_id 
        ORDER BY play_count DESC
        LIMIT 20 OFFSET ${page*20};
        `,
     (err, results, fields) => {
        if (err) {
            console.error(err);
            return
        }
        res.send(results);
      }); 
    }
const album =(page, res,db) => {
    db.query(
        `SELECT 
        al.album_id AS id, al.name as name, al.cover_img AS img,
         sum(i.play_count) AS play_count,
         ar.name AS artist, ar.artist_id  
         FROM songs AS s
         JOIN interactions AS i
         ON s.song_id = i.song_id
         RIGHT Join albums As al
         ON s.album=al.album_id
         JOIN artists as ar
         ON ar.artist_id = al.artist
         GROUP BY al.name
         ORDER BY play_count DESC
         LIMIT 20 OFFSET ${page*20};`,
         (err, results, fields) => {
            if (err) {
                console.error(err);
                return
            }
            res.send(results);
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
            res.send(results);
    }); 
}
const playlist =(page, res,db) => {
    db.query(
        `SELECT p.playlist_id AS id, p.name,
        p.cover_img AS img, p.created_by, 
        SUM(i.play_count) AS plays ,
        u.nickname AS user
        FROM playlists as p
        LEFT Join playlist_interactions AS i
        ON p.playlist_id = i.playlist_id
        JOIN spopify.users as u
        on u.user_id= p.created_by        
        GROUP BY p.playlist_id
         ORDER BY plays DESC
         LIMIT 20 OFFSET ${page*20};
         `,
         (err, results, fields) => {
            if (err) {
                console.error(err);
                return
            }
            res.send(results);
    }); 
}
module.exports={artist,album,song,playlist}