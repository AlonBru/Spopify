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
        `SELECT * FROM playlist 
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
module.exports={artist,album,song,playlist}