const song =(search,res,db,limit=5) => {
    db.query(
        `
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
        ON album = album_id
        Join artists as ar
        ON ar.artist_id = s.artist
        LIMIT ${limit}
        `,
        (err,results,fields) => {
            if(err){
                console.error(err)
            }
            res.send(results)
        }
    )
}
const artist =(search,res,db,limit=5) => {
    db.query(
        `SELECT name, artist_id as id, img
        FROM (SELECT *
        from Artists
        WHERE name LIKE '${search}%'
        UNION (Select *
        FROM artists
        WHERE name LIKE '% ${search}%')
        UNION (Select * 
        from  artists
        WHERE name LIKE '_${search}%')) AS al
        LIMIT ${limit}
        `,
        (err,results,fields) => {
            if(err){
                console.error(err)
            }
            res.send(results)
        }
    )
}
const album = (search,res,db, limit=5) => {
    db.query(
        `
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
        LIMIT ${limit}
        `,
        (err,results,fields) => {
            if(err){
                console.error(err)
            }
            res.send(results)
        }
    )
}
const playlist =(search, res,db,limit=5) => {
    db.query(
        `SELECT p.name, playlist_id AS id,
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
        LIMIT ${limit}
        `,
        (err,results,fields) => {
            if(err){
                console.error(err)
            }
            res.send(results)
        }
    )
}
module.exports={artist,album,song,playlist}