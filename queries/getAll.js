const artist = (page, res,db) => {
    db.query(
        `SELECT * FROM artists 
        LIMIT 20 OFFSET ${page*20}
        `,
        (err,results,fields) => {
            if(err){
                console.error(err)
                return
            }
            res.send(results)
        }
    )
}
const album = (page, res,db) => {
    db.query(
        `SELECT * FROM albums 
        LIMIT 20 OFFSET ${page*20}
        `,
        (err,results,fields) => {
            if(err){
                console.error(err)
                return
            }
            res.send(results)
        }
    )
}
const song = (page, res,db) => {
    
    db.query(
        `SELECT * FROM songs 
        LIMIT 20 OFFSET ${page*20}
        `,
        (err,results,fields) => {
            if(err){
                console.error(err)
                return
            }
            res.send(results)
        }
    )
}
const playlist = (page, res,db) => {
    
    db.query(
        `SELECT p.*, SUM(i.play_count) AS plays ,u.nickname AS user
        FROM playlists as p
        LEFT Join playlist_interactions AS i
        ON p.playlist_id = i.playlist_id
        JOIN users as u
        on u.user_id= p.created_by        
        GROUP BY p.playlist_id
        `,
        (err,results,fields) => {
            if(err){
                console.error(err)
                res.send('error')
                return
            }
            res.send(results)
        }
    )
}
module.exports={artist,album,song,playlist}