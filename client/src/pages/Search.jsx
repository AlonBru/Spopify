import React, { useState, useEffect } from 'react';
import { useLocation,useParams } from 'react-router-dom';
import axios from 'axios';
import Display from '../components/SearchDisplay'
import Buttons from '../components/SearchButtons'

function Search() {
  const [results, setResults] = useState();
  const location = useLocation()
  const params = useParams()[0].slice(1)
  const sendSearch = () => {
    const query = location.search.substring(7)
    const index = params.length
    ?params
    :'all'
    const delayedSearch = setTimeout(
      ()=>{
        axios.get(`/elastic/${index}?search=${query}`)
        .then( ( {data} ) => {
          setResults(data)
          console.log(data)
        })
      },500
    )
  }
  //delayed search if query changes
  useEffect(
    ()=>{
      const delayedSearch = setTimeout(
        sendSearch,500
        )
        return ()=>{clearTimeout(delayedSearch)}
      },
    [location.search]
  )
  //but not params
  useEffect(
    sendSearch,
    [location.pathname]
  )

  return (
   results
   ?<div className="search">
   <h1>Search</h1>
   <Buttons/>
    {params.length
    ?<Display results={results} target={params}/>
    :Object.keys(results)
    .map(key=>{
    return <Display results={results[key]} target={key}/>

    })}
   </div>
   :<h1>
     Loading...
   </h1>
  );
}

export default Search;
