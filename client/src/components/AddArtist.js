import React , {useState,useEffect} from 'react';
import axios from 'axios';

function AddArtist({sendData,sendStatus}) {
    const dataToAdd ={}
    const inputChange = (e) => {
        addData(e.target)
    } 
    const addData = ({name,value}) => {
        dataToAdd[name]=value
    }
    const submitChecks = (e)=>{
        e.preventDefault()
        if(!Object.keys(dataToAdd).length){
            sendStatus({status:'error',message:'you have not entered data'})
            return
        }
        e.target.reset()
        sendData(dataToAdd)
    }
    return (
        <form 
        id='form'
        autoComplete='off'
        onSubmit={submitChecks} >
            <input type='reset' for='form'/> <br/>
            <label htmlFor='name'>artist name*:   
                <input required name='name' placeholder='artist name' onChange={inputChange}/> <br />
            </label>
            <label htmlFor='img'>image: 
                <input name='img' placeholder='image url' onChange={inputChange} /><br />
            </label>
            <label htmlFor='active_since'>active since*: 
                <input required name='active_since' type='date' onChange={inputChange} /> 
            </label><br />
            
            <input id='checkBtn' type='button' value='check data' onClick={()=>{console.log(dataToAdd)}}  />
            <input type='submit' />
        </form>
  )
}
export default AddArtist;
