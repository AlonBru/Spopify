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

async function migrateArtists (results,res) {
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
      const erroredDocuments = []
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          })
        }
      })
      res.status(500).json(erroredDocuments)
    }
    const { body: count } = await client.count({ index: 'artists' })
    res.send(count)
  }catch(error){
    console.error(error)
  }
}

async function getResults (index,res) {
  const { body } = await client.search({
    index: index,
    body: {
      query: {
        match: {
          name: 'billie'
        }
      }
    }
  })

  res.json(body.hits.hits.map(hit=>hit._source))
}

  module.exports ={
    migrateArtists,
    getResults
  }
// client.bulk({
  //   index: string,
  //   type: string,
  //   wait_for_active_shards: string,
//   refresh: 'true' | 'false' | 'wait_for',
//   routing: string,
//   timeout: string,
//   _source: string | string[],
//   _source_excludes: string | string[],
//   _source_includes: string | string[],
//   pipeline: string,
//   require_alias: boolean,
//   body: object
// })
