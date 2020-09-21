import '../stylesheets/Song.css'
import React, {useState,useEffect,} from 'react';
import {Link,useLocation} from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading.js'
import SongList from '../components/SongList';
import Lyrics from '../components/Lyrics';

function Song( {match}) { 
    const [song,setSong] = useState()
    const [list,setList] = useState()
    const [isPlaying,setIsPlaying] = useState(false)
    useEffect(getSong,[useLocation()])
    
    const queries= new URLSearchParams(useLocation().search);
    const queryObject = {
        from:queries.get('from'),
        id:queries.get('id')
    }
    
    function getSong(){
        axios.get(`/song/${match.params.id}`)
        .then(({data})=>{
            console.log(data)
            if(Array.isArray(data)){data=data[0]}
            setSong(data)
            getList()
        }) 
        .catch(e=>console.error(e)) 
    }
    function getList(){
        axios.get(`/getBy${queryObject.from||'album'}/songs?id=${queryObject.id}`)
        .then(({data})=>{
            console.log(data)
            setList(data)

        }) 
        .catch(e=>console.error(e)) 
    }
    if(!song){return <Loading />}
    return (
        <div id='songPage'>
            <div className='cover'>
                <span id='details'>
                    <h2>{song.name}</h2> 
                    <Link to={`/album/${song.album}`} >
                    <h3>
                        {!song.album_name
                        ?''
                        :(song.album_name.length>28
                        ?song.album_name.slice(0,28)+'...'
                        :song.album_name)}
                    </h3>
                    </Link>
                    <h4> 
                        By: {
                    <Link to={`/artist/${song.artist}`} >
                            {song.artist_name}
                    </Link>
                            }
                    </h4>
                    <span>{song.length&&song.length.slice()+' | '}</span>
                    <Lyrics lyrics={song.lyrics} />
                </span>
                <div id='frame-wrap' >
                    <iframe
                        id='frame'
                        src={`https://open.spotify.com/embed/track/${song.youtube_link}`}
                        width="300"
                        height="380"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media">
                    </iframe>           
                </div>
            </div>
            <SongList list={list} 
            type={queryObject.from} 
            id={queries.get('id')} />
        </div>
    )
}
export default Song;