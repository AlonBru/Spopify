const router = require('express').Router()
const elastic = require('../helpers/elastic');
const {getAll} = require('../helpers/queries');

router.post('/artists',(req,res)=>{
  getAll.artists()
  .then(results=>{
    elastic.clearIndex('artists')
    
    elastic.migrateArtists(results)
    .then(count=>res.json({status:'success',uploaded:count.count}))
    
  })
  .catch(err=>{
    console.error( err)
  })
  
})
  
router.post('/albums',(req,res)=>{
  getAll.albums()
  .then(results=>{
    elastic.clearIndex('albums')
    elastic.migrateAlbums(results)
    .then(count=>res.json({status:'success',uploaded:count}))
  })
  .catch(err=>{
    console.error( err)
  })
  
})

router.post('/songs',(req,res)=>{
  getAll.songs()
  .then(results=>{
    elastic.clearIndex('songs')
    elastic.migrateSongs(results)
    .then(count=>res.json({status:'success',uploaded:count}))
  })
  .catch(err=>{
    console.error( err)
  })
  
})
  
router.get('/:index',(req,res) => {
  const {index} = req.params
  const {search:searchQuery} = req.query
    try{
      elastic.search(searchQuery,index).then(results=>{  
        res.json(results)
      })
    }catch(error){
      console.error(error)
    }
})


module.exports = router