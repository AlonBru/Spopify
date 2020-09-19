import Axios from 'axios';
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios'

function Search() { 
    const [results,setResults] = useState([])
    const search = (e) => {
      //TODO implement  
    }
    return (
        <input id='search' type='search' placeholder='search' onChange={search}/>
)}
export default Search;
