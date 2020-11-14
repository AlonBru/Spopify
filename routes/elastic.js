const router = require('express').Router()
const elastic = require('../helpers/elastic');
const {getSearchData,findItem, search} = require('../helpers/queries');
// POST
router.post('/migrate/artists',(req,res)=>{
  getSearchData.artists()
  .then(results=>{
    elastic.clearIndex('artists')
    
    elastic.migrateArtists(results)
    .then(count=>res.json({status:'success',uploaded:count.count}))
    
  })
  .catch(err=>{
    console.error( err.message)
  })
  
})
  
router.post('/migrate/albums',(req,res)=>{
  getSearchData.albums()

  .then(results=>{
    elastic.clearIndex('albums')
    elastic.migrateAlbums(results)
    .then(count=>res.json({status:'success',uploaded:count}))
  })
  .catch(err=>{
    console.error( err)
  })
  
})

router.post('/migrate/songs',(req,res)=>{
  getSearchData.songs()
  .then(results=>{
    elastic.clearIndex('songs')
    elastic.migrateSongs(results)
    .then(count=>res.json({status:'success',uploaded:count}))
  })
  .catch(err=>{
    console.error( err)
  })
  
})

router.post('/migrate/playlists',(req,res)=>{
  getSearchData.playlists()
  .then(results=>{
    elastic.clearIndex('playlists')
    elastic.migratePlaylists(results)
    .then(count=>res.json({status:'success',uploaded:count}))
  })
  .catch(err=>{
    console.error( err)
  })
  
})

router.post('/:index',(req,res)=>{
  const {index} = req.params
  const {body} = req
  findItem[index](body)
  .then(results=>{
    console.log(results)
    try{  
      elastic.create(index+'s',results[0]).then(()=>{
        res.send('success')
      })
    }catch(error){
      console.error(error)
      res.json({status:'error',error})
    }

  })

})

// GET
router.get('/sql',(req,res) => {
  res.redirect('../../api/ping')
})

router.get('/all',(req,res) => {
  const {search:searchQuery} = req.query
    try{
      let all =elastic.searchAll(searchQuery)
      all.results
      .then(resultsArray=>{
        let searchResults = {}
        all.indices.forEach( (index,i)=>
          searchResults[index] = resultsArray[i]
        )
        res.json(searchResults)
      })
    }catch(error){
      console.error(error)
    }
})

router.get('/:index',(req,res) => {
  const {index} = req.params
  const {search:searchQuery} = req.query

    try{
      elastic.search(searchQuery,index)
      .then(results=>{  
        res.json(results)
      })
    }catch(error){
      console.error(error)
    }
})



module.exports = router