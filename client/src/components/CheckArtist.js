import React , {useState} from 'react';
import axios from 'axios';

function CheckArtist({addData,album=false}) {
    
    const [check,setCheck]= useState()
    
    const checkFK = (e) => {
        const event = {...e}
        const query = event.target.value
        if(query===''){
            setCheck()
            addData({name:'artist',value:undefined})

            return
        }
        axios.get(`/artist/${query}`)
        .then(({data})=>{
            
            let checkResult
            switch(data.length){
                case 0:
                    checkResult='search found no artists' 
                    break;
                case 1:
                    const artist = data[0]
                    checkResult=`selected ${artist.name}, artist id: ${artist.artist_id}`
                    break;
                    
                default:
                    checkResult=`search found ${data.length} artists: \n- `+
                    data.map(artist=>`${artist.name} id: ${artist.artist_id}`).join('\n- ') 
            }
            setCheck(checkResult)
            if(data.length===1) {
                addData({name:'artist',value:data[0].artist_id})
            }else{
                addData({name:'artist',value:undefined})
            }

        })
        .catch(e=>console.error(e))
    }
    return (
        <label className='checkArtist' htmlFor='artist' >artist*
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
