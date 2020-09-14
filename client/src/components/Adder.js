import React , {useState,useEffect} from 'react';
import axios from 'axios'
import AddArtist from './AddArtist.js'
import AddAlbum from './AddAlbum.js'
import AddSong from './AddSong.js'
import AddPlaylist from './AddPlaylist.js'

function Adder() {
    const [whatToAdd,setWhatToAdd] = useState('artist')
    const [status,setStatus]= useState()
    const [dataToSend,setDataToSend]= useState()
    
    function pickTarget(e){
        setWhatToAdd(e.target.value)
    }
    
    function sendData(data){
        axios.post(`/${whatToAdd}`,data)
        .then(res=>{
            setStatus(res.data)
        })
        .catch(e=>{
            setStatus(e.data)
        })
    }
    function testConnection(){
        axios.get(`/ping`)
        .then(res=>{
            setStatus(res.data)
        })
        .catch(e=>{
            setStatus(e.data)
        })
    }
    const drawInput = () => {
         switch(whatToAdd){
             case 'artist':
                return <AddArtist sendData={sendData} sendStatus={setStatus} />;
             case 'album':
                return <AddAlbum sendData={sendData} sendStatus={setStatus} />;
             case 'song':
                return <AddSong sendData={sendData} sendStatus={setStatus} />;
             case 'playlist':
                return <AddPlaylist sendData={sendData} sendStatus={setStatus} />;
            default:
                return <p> please select what you want to add</p>
         }
    }
    
    return (
        <div id='adder'>
            <select defaultValue='' name='target' onChange={pickTarget}>
                <option value=''  disabled >what to add?</option>
                <option>add a song</option>
                <option>add an album</option>
                <option>add an artist</option>
                <option>add a playlist</option>
            </select>
            
            {drawInput()}
            {/* <button onClick={() => {setStatus({status:'success',message:'sent.'})}}>setStatus</button> */}
           <button onClick={sendData}>test Error</button>
           <button onClick={testConnection}>test connection</button>
            <p className={status?status.status:''}>{status?status.message:''}</p>
        </div>
  )
}

export default Adder;
