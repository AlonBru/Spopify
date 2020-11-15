require('dotenv').config()
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ 
  cloud: {
  id: process.env.ELASTIC_ID,
},
auth: {
  username: 'elastic',
  password: process.env.ELASTIC_PW
}})

const elastic = {}

elastic.migrateArtists = async function (results) {
  const data = results.flatMap(doc => {
    doc.uploadedAt = new Date()
    return [{ index: { _index: 'artists' } }, doc]
  })
  try{
    await client.indices.create({
      index: 'artists',
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            name: { type: 'text' },
            img: { type: 'text' },
            uploadedAt: { type: 'date' }
          }
        }
      }
    }, { ignore: [400] })
    
    const { body: bulkResponse } = await client.bulk({ refresh: true, body:data })
    if (bulkResponse.errors) {
      throw bulkResponse.errors
    }
    const { body: count } = await client.count({ index: 'artists' })
    return count
  }catch(error){
    console.error(error);
  }
}
    
elastic.migrateAlbums = async function (results) {
  const data = results.flatMap(doc => {
    doc.uploadedAt = new Date()
    return [{ index: { _index: 'albums' } }, doc]
  })
  try{
    await client.indices.create({
      index: 'albums',
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            name: { type: 'text' },
            artist: { type: 'text' },
            img: { type: 'text' },
            uploadedAt: { type: 'date' }
          }
        }
      }
    }, { ignore: [400] })
   
    const { body: bulkResponse } = await client.bulk({ refresh: true, body:data })
    if (bulkResponse.errors) {
      throw bulkResponse.errors
    }

    const { body: count } = await client.count({ index: 'albums' })
    
    return count

  }catch(error){
    console.error(error);
  }
}

elastic.migrateSongs = async function (results) {
  const data = results.flatMap(doc => {
    doc.uploadedAt = new Date()
    return [{ index: { _index: 'songs' } }, doc]
  })
  try{
    await client.indices.create({
      index: 'songs',
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            name: { type: 'text' },
            artist: { type: 'text' },
            img: { type: 'text' },
            uploadedAt: { type: 'date' }
          }
        }
      }
    }, { ignore: [400] })
   
    const { body: bulkResponse } = await client.bulk({ refresh: true, body:data })
    if (bulkResponse.errors) {
      throw bulkResponse.errors
    }

    const { body: count } = await client.count({ index: 'songs' })
    
    return count

  }catch(error){
    console.error(error);
  }
}

elastic.create = async (index,data) => {
 try{

   await client.index({
     index: index,
     refresh: 'true',
     body: data
    })
  }catch(error){
    console.error(error)
  }
}

elastic.migratePlaylists = async function (results) {
  const data = results.flatMap(doc => {
    doc.uploadedAt = new Date()
    return [{ index: { _index: 'playlists' } }, doc]
  })
  try{
    await client.indices.create({
      index: 'playlists',
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            name: { type: 'text' },
            artist: { type: 'text' },
            img: { type: 'text' },
            uploadedAt: { type: 'date' }
          }
        }
      }
    }, { ignore: [400] })
   
    const { body: bulkResponse } = await client.bulk({ refresh: true, body:data })
    if (bulkResponse.errors) {
      throw bulkResponse.errors
    }

    const { body: count } = await client.count({ index: 'playlists' })
    
    return count

  }catch(error){
    console.error(error);
  }
}
    

elastic.search = async function  (searchQuery,index) {
  const { body } = await client.search({
    index: index,
    size:100,
    body: {
      query: {
        wildcard: {
          name: {
            // value: "b",
            value: `*${searchQuery}*`,
            boost: 1.0,
            rewrite: "constant_score"
          },
        }
      }
    }
  })
  return body.hits.hits.map(hit=>hit._source)
}

elastic.searchAll = function  (searchQuery) {
  const indices = ['artists','albums','songs','playlists']
  return {
    indices,
    results:Promise.all(
      indices.map(
        index=>elastic.search(searchQuery,index) 
      ) 
    )
  }
}

elastic.clearIndex =  async function (index){
  try{
    response = await client.deleteByQuery({
      index:index,
      body:{
        query: {
          "match_all": {}
          // wildcard: {
          //   name: {
          //     value: "*",
          //     boost: 1.0,
          //     rewrite: "constant_score"
          //   },
          // }
        }
      }
    })
    return response
  }catch(err){
    console.error('clear',err)
  }
}

  module.exports =elastic
