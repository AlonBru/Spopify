import React, {useState,useEffect,} from 'react';
import {Link,useLocation} from "react-router-dom";
import axios from 'axios'

function Song( {match}) { 
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const queries=useQuery()
    console.log(useLocation())
    useEffect(getSong,[])
    function getSong(){
         axios.get(`/song/${match.params.id}`)
         .then(({data})=>{
             console.log(data)
             if(Array.isArray(data)){data=data[0]}
             setSong(data)
            }) 
         .catch(e=>console.error(e)) 
        }
    const [song,setSong] = useState([])
    
    return (
        <div>
        {/* <h2>{song.name}</h2> 
        <h3>{song.artist_name}</h3>
        <h3>{song.album_name||''}</h3> */}
    youtube embed player, length, lyrics
        <iframe 
            src={`https://open.spotify.com/embed/track/2Fxmhks0bxGSBdJ92vM42m`}
            width="300"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media">
        </iframe>
        </div>
    )
}
export default Song;
{/*  show name, artist name, album,
    youtube embed player, length, lyrics.
    If came from artist it should add 
    ?artist=g45g4 parameter and show suggested songs
 from the same artists on the right of the song page.
 If came from album it should add ?album=g45g4 parameter 
and show suggested songs from the same album on the right of the song page If came from playlist it should add ?playlist=g45g4 parameter and show suggested songs from the same playlist on the right of the song page.*/}