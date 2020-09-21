import '../stylesheets/Home.css';
import React , {useState} from 'react';
import {
Link, Switch, Route, useRouteMatch, useParams
 } from 'react-router-dom'
import axios from 'axios' 
import Carousel from '../components/Carousel.js' 
import SongList from '../components/SongList.js' 
function Home({match, mini}) {
    const darken = (e) => {
        const currentScroll= e.target.scrollTop
        console.log(currentScroll)
        if(currentScroll>200){}
    }
    
    return(
        <div id='home'>
        <header>
            <h1>HOME</h1>
        </header>
        <div id='mini' className={mini?'show':undefined}>
            <h1>HOME</h1>
        </div>
        <h2>{`Top songs`}</h2>
        <Carousel target='song'/>
        <h2>{`Top albums`}</h2>
        <Carousel target='album'/>
        <h2>{`Top artists`}</h2>
        <Carousel target='artist'/>
        <h2>{`Top playlists`}</h2>
        <Carousel target='playlist'/>
        </div>
    )
}

export default Home;
