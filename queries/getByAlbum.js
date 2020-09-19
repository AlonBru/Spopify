const getSongs = (id,res,db) => {
    db.query(
        `SELECT
        s.song_id, s.track_number, s.name AS title, s.length,
        SUM(i.play_count) AS plays
        FROM songs AS s
        LEFT JOIN interactions as i
        on s.song_id = i.song_id
        WHERE s.album = '${id}'
        GROUP BY s.song_id
        Order BY s.track_number ASC;
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
