const router = require('express').Router()
const queries = require('../helpers/queries');
const {create} = require('../helpers/elastic');

router.get('/ping',(req,res)=>{
  res.send('pomg')
})
//search
router.get('/search/:index',(req,res)=>{
  const {index} = req.params;
  const {search} = req.query;
  console.log(index,search)
  queries.search[index](search)
  .then(results=>{
    res.send(results)
  })
  .catch(e=>{
    console.error(e)
  })
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
router.get('/getByArtist/:index', (req,res) => {
  const {index} = req.params
  const {page,id} = req.query
  queries.getByArtist[index](id,page)
  .then(results=>{res.json(results)})
  .catch(console.error)
})

router.get('/getByAlbum/songs', (req,res) => {
  const {id} = req.query
  queries.getByAlbum(id)
  .then(results=>{res.json(results)})
  .catch(console.error)

})

router.get('/getByPlaylist/songs', (req,res) => {
  const {id} = req.query
  queries.getByPlaylist(id)
  .then(results=>{res.json(results)})
  .catch(console.error)
})

// get top 20 of target (define a query ?page=0,1,2,3 for the next 20)
router.get('/top_:target',(req,res) => {
  const {target} = req.params;
  const page = Math.abs(req.query.page)||0;
  queries.getTop[target](page)
  .then(results=>{res.json(results)})
  .catch(console.error)
})

//get by id
router.get('/:index/:id', (req, res) => {
  const {index, id} = req.params;
  queries.getById[index](id)
  .then(results=>{res.json(results)})
  .catch(console.error)
});

router.get('/:index', (req, res) => {
  console.log('craa')
  const {index} = req.params;
  queries.getAll[index]()
  .then(results=>{res.json(results)})
  .catch(console.error)
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
queries.addToPlaylist(song,playlist)
.then(()=>{res.status(200).send('success')})
.catch(e=>{
  if (e.code = 'ER_DUP_ENTRY'){
    res.status(400).send('already-there')
  }
  console.error(e);
})
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
  .catch(console.error)
})

//update an "un/like"
router.put('/setLike/:target/:id',(req,res) => {
  let data= [
    {created_at:(new Date),is_liked:req.body.like},
    {is_liked:req.body.like}
  ]
    const {target,id} = req.params
  queries.like[target](id,data)
  .then(()=>{res.status(204).send()})
  .catch(e=>{console.error(e)})
})
//update an entry
router.put('/:index/:id',(req,res) => {
  const {index,id} = req.params
  const {body} = req
  const data = Object.keys(body).map(key=>`${key}='${body[key]}'`)
  
  queries.updateById(index,id,data)
  .then(()=>{res.send(`updated ${index} ${id},
  fields: ${JSON.stringify(body,null,2)}`)})
  .catch(console.error)
  //TODO: add Elastic update
})

//delete an entry
router.delete('/:target/:id',(req,res) => {
  queries.deleteById(req,res,db)
  //TODO: add Elastic update
})


router.get('/a',(req,res)=>{
  res.redirect('..')
})
router.get('/',(req,res)=>{
console.log('nothing caught')
  res.send('a')
})

module.exports = router