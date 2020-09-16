import React , {useState} from 'react';
import {
Link, Switch, Route, useRouteMatch, useParams
 } from 'react-router-dom'
import axios from 'axios' 
import Carousel from '../components/Carousel.js' 
function Home({match}) {
    console.log(match)
    
    return(
        <div>
        <h1>HOME</h1>
        <Carousel target='song'/>
        <Carousel target='album'/>
        <Carousel target='artist'/>
        </div>
    )
}

export default Home;
