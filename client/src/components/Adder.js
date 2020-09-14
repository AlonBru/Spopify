import React , {useState,useEffect} from 'react';
import axios from 'axios'
import AddArtist from './AddArtist.js'
import AddAlbum from './AddAlbum.js'
import AddSong from './AddSong.js'
import AddPlaylist from './AddPlaylist.js'

function Adder() {
    const [whatToAdd,setWhatToAdd] = useState('album')
    function pickTarget(e){
        console.log('add', e.target.value)
        setWhatToAdd(e.target.value)
    }
    function sendData(data){
        console.log(data)
        axios.post(`/${whatToAdd}`,data)
        .then(res=>console.log(res))
        .catch(e=>console.error(e))
    }
    const drawInput = () => {
         switch(whatToAdd){
             case 'artist':
                return <AddArtist sendData={sendData}/>;
             case 'album':
                return <AddAlbum sendData={sendData}/>;
             case 'song':
                return <AddSong sendData={sendData}/>;
             case 'playlist':
                return <AddPlaylist sendData={sendData}/>;
            default:
                return <p> please select what you want to add</p>
         }
    }
    
    return (
        <div id='adder'>
            <select defaultValue='' name='target' onChange={pickTarget}>
                <option value=''  disabled >what to add?</option>
                <option>song</option>
                <option>album</option>
                <option>artist</option>
                <option>playlist</option>
            </select>
            {drawInput()}
        </div>
  )
}

export default Adder;
