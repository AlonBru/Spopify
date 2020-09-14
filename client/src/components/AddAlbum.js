import React from 'react';
import CheckArtist from './CheckArtist.js';

function AddAlbum({sendData}) {
    const dataToAdd = {};
    const inputChange = (e) => {
        addData(e.target)
    } 
    const addData = ({name,value}) => {
        dataToAdd[name]=value
        console.log(dataToAdd)
    }
    return (
        <form 
        autoComplete='off'
        onSubmit={(e)=>{
            e.preventDefault()
            sendData(dataToAdd)
            e.target.reset()
        }}>
            <CheckArtist addData={addData} />
            <label htmlFor='name'>album name*:   
                <input required name='name' placeholder='album name' onChange={inputChange}/> <br />
            </label>
            <label htmlFor='cover_img'>Cover Art: 
                <input name='cover_img' placeholder='cover image url' onChange={inputChange} /><br />
            </label>
            <label htmlFor='released'>release date*: 
                <input required name='released' type='date' onChange={inputChange} /> 
            </label><br />
            
            <input type='submit' />
            <input id='checkBtn' type='button' value='check data' onClick={()=>{console.log(dataToAdd)}} />
        </form>
  )
}
export default AddAlbum;
