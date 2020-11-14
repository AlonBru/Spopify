const router = require('express').Router()
const queries = require('../helpers/queries');
const {create} = require('../helpers/elastic');

router.get('/ping',(req,res)=>{
  res.send('pomg')
})
//search
router.get('/search',(req,res)=>{
  const {search} = req.query;
  queries.search['artist'](search)
})

// old search (used in adder page)
// router.get('/search/artist',(req,res)=> {
//     queries.searchArtist(req,res,db)
// })

// //get the column names 
// router.get('/fields/:target', (req,res) => {
//   queries.getFields(req,res,db)
// })

// get target by (e.g songs by artist) 
router.get('/getByArtist/:target', (req,res) => {
  const {target} = req.params
  const {page,id} = req.query
  queries.getByArtist[target](id,page,res,db)
})
router.get('/getByAlbum/songs', (req,res) => {
  const {id} = req.query
  console.log('getByAlbum', id)
  queries.getByAlbum(id,res,db)
})
router.get('/getByPlaylist/songs', (req,res) => {
  const {id} = req.query
  console.log('getByPlaylist', id)
  queries.getByPlaylist(id,res,db)
})

// get top 20 of target (define a query ?page=0,1,2,3 for the next 20)
router.get('/top_:target',(req,res) => {
  const {target} = req.params;
  const page = Math.abs(req.query.page)||0;
  queries.getTop[target](page,res,db)
})

//get by id
router.get('/:target/:id', (req, res) => {
  const {target, id} = req.params;
  console.log('getById',target,id)
  queries.getById[target](id,res,db)
});

// get all of target, 20 at a page (define a query ?page=0,1,2,3 for the next 20)
// router.get('/:target', (req, res) => {
//     const page =Math.abs(req.query.page)||0;
//     const {target} =req.params;
//     queries.getAll[target](page,res,db)
//   });

// add song to playlist
router.post('/songToPlaylist',(req,res) => {
const {song,playlist}= req.query;
queries.addToPlaylist(song,playlist,res,db)
})


// add an entry
router.post('/:index',(req,res) => {
  const {index} = req.params
  const {body} = req
  body.uploaded_at = new Date()
  queries.addNew(index,body)
  .then(()=>{
    res.redirect(307,`../../elastic/${index}`)
  })
})

//update an "un/like"
router.put('/setLike/:target/:id',(req,res) => {
let data= [
    {created_at:(new Date),is_liked:req.body.like},{is_liked:req.body.like}]
    const {target,id} = req.params
queries.Like[target](id,data,res,db)
})
//update an entry
router.put('/:target/:id',(req,res) => {
  queries.updateById(req,res,)
})
//delete an entry
router.delete('/:target/:id',(req,res) => {
  queries.deleteById(req,res,db)
})


router.get('/a',(req,res)=>{
  res.redirect('..')
})
router.get('/',(req,res)=>{
console.log('nothing caught')
  res.send('a')
})

module.exports = router