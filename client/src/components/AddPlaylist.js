import React from 'react';

function AddArtist({sendData}) {
    const data ={}
    const addData = (e) => {
        const {value,name} = e.target
        data[name]=value
    }
    return (
        <div  >
            <input name='name' placeholder='name' onChange={addData}/> <br />
            <input name='img' placeholder='image url' onChange={addData} /><br />
            <label htmlFor='active_since'>active since
            <input name='active_since' type='date' onChange={addData} /> <br />
            </label>
            
            <input type='submit' onClick={()=>{sendData(data)}} />
        </div>
  )
}
export default AddArtist;
