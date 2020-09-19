import Axios from 'axios';
import React, {useState} from 'react';
import {Link,useHistory} from "react-router-dom";
import axios from 'axios'

function Search() { 
    const [results,setResults] = useState([])
    const search = (e) => {
      //TODO implement  
    }
    
    const history=useHistory()
    console.log()
    return (
        <div id='topbar'>
            <button onClick={history.goBack}> {'<'} </button>
            <button onClick={history.goForward}> {'>'} </button>
            <input id='search' type='search' placeholder='🔍' onChange={search} onFocus={'e'}/>
        </div>
)}
export default Search;
