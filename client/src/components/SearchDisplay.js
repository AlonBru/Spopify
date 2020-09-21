import React , {useState,useEffect} from 'react';
import {
Link, Switch, Route, useRouteMatch, useParams
 } from 'react-router-dom'
import axios from 'axios'
import SearchCard from './SearchCard.js' 


function SearchDisplay({target,query}) {
    const [results,setResults] = useState([])
    
    useEffect(()=>{
        if(!query.length){
            setResults([])
            return}
        axios.get(`/search/${target}/${query}`)
        .then(({data})=>{
            console.log(data)
            setResults(data)
        })
        .catch(e=>{console.error(e)})
    },[query])
    if(results.length===0) {return <h3>Nothing to show..</h3>} 
    return (
        <div className='SearchDisplay'>
                {results
                .slice()
                .map(chart=>{
                    return SearchCard({...chart,target})
                    })}
        </div>
        )
}

export default SearchDisplay;
