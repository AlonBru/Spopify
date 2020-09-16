import React, {useState,useEffect,} from 'react';
import {Link,useLocation} from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading.js'
// import play from './play.svg'
// import pause from './pause.svg'

function Song( {match}) { 
    const [song,setSong] = useState()
    const [hover,setHover] = useState(false)
    const [isPlaying,setIsPlaying] = useState(false)
    useEffect(getSong,[])
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const queries=useQuery()
    function getSong(){
        axios.get(`/song/${match.params.id}`)
        .then(({data})=>{
            console.log(data)
            if(Array.isArray(data)){data=data[0]}
            setSong(data)
        }) 
        .catch(e=>console.error(e)) 
    }
    if(!song){return <Loading />}
    return (
        <div>
        <p>{song.name}</p> 
        <p>{song.artist_name}</p>
        <p>{song.album_name||''}</p>
        <p>{song.length&&song.length.slice()}</p>
        <div id='frame-wrap' 
        onClick={()=>{console.log('xlixk')}}>
        {/* onClick={()=>{setIsPlaying((isPlaying))}}> */}
       {/* <div id='hider' >
             <div id='play'
            className={
                hover?' hover':'' 
                }
                /> 
        </div> */}
            <iframe
                onMouseOver={()=>{
                    setHover(true)}}
                onMouseOut={()=>{setHover(false)}}
                id='frame'
                src={`https://open.spotify.com/embed/track/${song.youtube_link}`}
                width="300"
                height="380"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media">
            </iframe>
            
        </div>
                <p>{isPlaying?' playing':'not'} {hover?' hover':' novere'}</p>
        </div>
    )
}
export default Song;