import '../stylesheets/Playlist.css'
import React, {useState,useEffect} from 'react';
import {
    Link,
    useLocation,
    BrowserRouter as Router,
    // useRouteMatch,
     } from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading.js'
import SongList from '../components/SongList.js'


function Playlist({match}) { 
    const [playlist,setPlaylist] = useState()
    const [songs,setSongs] = useState()
    useEffect(getPlaylist,[])
    const location = useLocation()
    function getPlaylist(){
        axios.get(`/playlist/${match.params.id}`)
        .then(({data})=>{
            if(Array.isArray(data)){data=data[0]}
            console.log(data)
            setPlaylist(data)
            getSongs(data)

        }) 
        .catch(e=>console.error(e)) 
    }
    function getSongs(playlist){
        axios.get(`/getByPlaylist/songs?id=${playlist.playlist_id}`)
        .then(({data})=>{
            console.log(data);
            setSongs(data)
        }) 
        .catch(e=>console.error(e)) 
    }
    if(!playlist){return <Loading />}
    return (
        <div id='playlistPage'>
            <div className='cover' 
                >
                <img src={playlist.cover_img} />
                    <h2>{playlist.name}</h2> 
                    <h4>By:
                    <Link to={`/user/${playlist.user}`} >
                     {' '+playlist.user}
                    </Link>
                     </h4> 
                    <span>
                    {songs&&' '+songs.length} songs, 
                    {' '+Math.round(playlist.total_length/60)} minutes
                    </span>
            </div>
            <div className='lists'>
            <SongList list={songs} type='Playlist' id={playlist.playlist_id} />
            </div>
        </div>                
    )
}
export default Playlist;