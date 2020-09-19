import React , {useState,useEffect} from 'react';
import {
Link, Switch, Route, useRouteMatch, useParams
 } from 'react-router-dom'
import axios from 'axios'
import Card from './Card.js' 


function Carousel({target}) {
    const [topCharts,setTopCharts] = useState([])
    const [page,setPage] = useState(0)
    
    useEffect(()=>{
        axios.get(`/top_${target}`)
        .then(({data}) => {setTopCharts(data.results)})
        .catch(err=>{console.error(err)})
    },[])
  
    return (
        <div className='carousel'>
            {topCharts
            .filter((ele,i)=>i>=page||i<page+6)
            .map(chart=>{
                    return Card({...chart,target,key:chart.id})
                })}
        </div>
        )
}

export default Carousel;
