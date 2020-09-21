
import React,{useState} from 'react';
import axios from 'axios'

function AddToPlaylist({song}){
    const[menuOpen,setMenuOpen] = useState(false)
    const[playlists,setPlaylists] = useState([])
    const [status,setStatus] = useState() 
    const getPlaylists = () => {
        axios.get('/playlist')
        .then(({data})=>{
            setPlaylists(data)
        })
        .catch(err=>{console.error(err)})
    }
    const addSong = (song,playlist) => {
        axios.post(`/songToPlaylist?song=${song}&playlist=${playlist}`)
        .then(({data})=>{
            setStatus(data)
            setTimeout(()=>{
                setStatus()
                setMenuOpen(false)
            },3000)
        })
        .catch(({data})=>setStatus(data))
    }
    return(
        <span style={{position:'relative'}}>
            <button 
            className='addToPlaylist'
            onClick={()=>{
                getPlaylists()
                setMenuOpen(true)
                }
                }>
                +
            </button>
            <div 
            className={
                (menuOpen?'addMenu ':'hide ') + (status?status:'')}>
               <span>choose playlist:</span>
               { 
                    status
                    ||
                    playlists.map(list=>{
                        return <button key={list.playlist_id}
                        onClick={()=>{addSong(song,list.playlist_id)}}>
                        {list.name}</button>
                    })
               }
               {<button onClick={() => {setMenuOpen(false)} }>close</button>}
            </div>
        </span>
    )
}
export default AddToPlaylist;
