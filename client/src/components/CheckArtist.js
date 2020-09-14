import React , {useState} from 'react';
import axios from 'axios';

function CheckArtist({addData}) {
    const [check,setCheck]= useState()
    const checkFK = (e) => {
        const event = {...e}
        const query = event.target.value
        if(query===''){
            setCheck()
            return
        }
        axios.get(`/artist/${query}`)
        .then(({data})=>{
            
            let checkResult
            switch(data.length){
                case 0:
                    checkResult='search found no artists' 
                    break;
                    default:
                        checkResult=`search found ${data.length} artists: \n- `+
                        data.map(artist=>`${artist.name} id: ${artist.artist_id}`).join('\n- ') 
            }
            setCheck(checkResult)
            if(data.length===1) {
                console.log(data.length)
                console.log(data[0].name,'id', data[0].artist_id)
                addData({name:'artist',value:data[0].artist_id})
                // document.getElementById('checkBtn').click()
            }
        })
        .catch(e=>console.error(e))
    }
    return (
        <label htmlFor='artist' >artist*
            <input 
                required name='artist' 
                placeholder='name or id'
                onChange={checkFK}
            />
            <br/>
            <p className={check?'checker':' hidden'}>{check}</p>
        </label>
  )
}
export default CheckArtist;
