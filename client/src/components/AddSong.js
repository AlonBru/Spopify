import React from 'react';
import CheckArtist from './CheckArtist.js';
import CheckAlbum from "./CheckAlbum";

function AddSong({sendData,sendStatus,showData}) {
    const dataToAdd = {genres:0};
    const inputChange = (e) => {
        addData(e.target)
    } 
    const addData = ({name,value}) => {
        dataToAdd[name]=value
    }
    const addGenres = (e) => {
        const {target}=e;
        if(target.type!=='checkbox'){return}  
        const {checked} = target  
        const value = Number(target.value)  
        console.log(typeof(value))    
        console.log(target.checked)
        dataToAdd.genres += (checked?value:-(value))
        console.log(dataToAdd.genres) 
    }
    const submitChecks = (e)=>{
        e.preventDefault()
        console.log(dataToAdd.artist,typeof(dataToAdd.artist))
        console.log(dataToAdd.album,typeof(dataToAdd.album))
        if(!dataToAdd.artist){
            sendStatus({status:'error',message:"can't have song with no artist"})
        }else if(dataToAdd.album&&dataToAdd.artist !== dataToAdd.album.artist){
            sendStatus({status:'error',message:'chosen album is not by chosen artist!'})
        }else{
            e.target.reset()
            sendData(dataToAdd)
        }
    }
    return (
        <form 
        id='form'
        autoComplete='off'
        onSubmit={submitChecks}>
            <CheckArtist addData={addData} />
            <CheckAlbum addData={addData} />
            <div >
            <label htmlFor='name'>song title*:   
                <input required name='name' placeholder='song title' onChange={inputChange}/> <br />
            </label>
            <label htmlFor='youtube_link'>youtube link*:   
                <input required name='youtube_link' placeholder='youtube link' onChange={inputChange}/> <br />
            </label>
            <label htmlFor='length'>length (hh:mm:ss)*: 
                <input step='1' required name='length' type='time' onChange={inputChange} /> 
            </label><br />
            <label htmlFor='released'>release date (for singles, album automatically adds this): 
                <input name='released' type='date' onChange={inputChange} /> 
            </label><br />
            <label htmlFor='track_number'>track number*: 
                <input step='1' required name='track_number' type='number' onChange={inputChange} /> 
            </label><br />
            <legend>lyrics:</legend>
                <textarea style={{width:'60vw'}} form='form' wrap='soft' rows='6' maxlength='10000' required name='lyrics' type='textarea' onChange={inputChange} /> 
            <div onClick={addGenres} >
                <legend>genres:</legend>
                    <label htmlFor='1'>
                        <input type="checkbox" name="rock" value={1} /> 
                        rock
                    </label><br/>
                    <label htmlFor='2'>
                        <input type="checkbox" name="pop" value={2} />
                        pop
                    </label><br/>
                    <label htmlFor='4'>
                        <input type="checkbox" name="jazz" value={4} />
                        jazz
                    </label><br/>
                    <label htmlFor='8'>
                        <input type="checkbox" name="rap" value={8} />
                        rap
                    </label><br/>
            </div>
            </div>
            
            <input type='submit' />
            <input type='reset' />
            <input id='checkBtn' type='button' value='check data' onClick={()=>{console.log(dataToAdd,(dataToAdd.album?dataToAdd.album.album_id:''))}} />
        </form>
  )
}
export default AddSong;
