
import React,{useState} from 'react';
import axios from 'axios'

function AddToPlaylist({lyrics}){
    const[open,setOpen] = useState(false)
    return(
        <span style={{position:'relative'}}>
            <button 
                className='lyricsButton'
                onClick={()=>{setOpen(true)}}>
            Lyrics</button>
            <div 
            className={
                (open?'lyrics':'hide')}>
               {<button className='close' onClick={() => {setOpen(false)} }>close</button>}
               <p><strong>Lyrics</strong>:{'\n'+lyrics}</p>
            </div>
        </span>
    )
}
export default AddToPlaylist;
