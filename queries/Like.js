const song =(id,data,res,db) => {
    const now= new Date;
    db.query(
        // (user_id, song_id, is_liked, play_count,created_at) 
        `INSERT INTO interactions 
        SET
        user_id=1, song_id='${id}',play_count=0, ?
        ON DUPLICATE KEY UPDATE
          ?
        `,data,
        (err,results,fields) => {
            if(err){
                console.error(err)
            }
            res.send('success')
        }
    )
}
const album = (id,page,res,db) => {
// unimplemented
}
const playlist =(page, res,db) => {
// unimplemented
}
module.exports={album,song,playlist}