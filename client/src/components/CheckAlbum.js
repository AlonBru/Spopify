import React , {useState} from 'react';
import axios from 'axios';

function CheckAlbum({addData}) {
    const [check,setCheck]= useState()
    const checkFK = (e) => {
        const event = {...e}
        const query = event.target.value
        if(query===''){
            setCheck()
            addData({name:'album',value:undefined})
            return
        }
        axios.get(`/album/${query}`)
        .then(({data})=>{
            
            let checkResult
            switch(data.length){
                case 0:
                    checkResult='search found no albums' 
                    break;
                case 1:
                    const album = data[0]
                    checkResult=`selected ${album.name}, by ${album.artist_name}, album id: ${album.album_id}`
                    break;
                    
                default:
                    checkResult=`search found ${data.length} albums: \n> `+
                    data.map(album=>`${album.name}, by ${album.artist_name}, album id: ${album.album_id}`).join('\n- ') 
            }
            setCheck(checkResult)
            if(data.length===1) {
                let {artist,album_id,released} = data[0]
                console.log({name:'album',value:{artist,album_id}})
                addData({name:'album',value:{artist,album_id}=data[0]})
                addData({name:'released',value:released})
            }else{
                addData({name:'album',value:undefined})
            }
        })
        .catch(e=>console.error(e))
    }
    return (
        <label className='checkAlbum' htmlFor='album' >album (leave blank for single)
            <input 
                name='album' 
                placeholder='name or id'
                onChange={checkFK}
            />
            <br/>
            <p className={check?'checker':' hidden'}>{check}</p>
        </label>
  )
}
export default CheckAlbum;
