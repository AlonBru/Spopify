import Axios from 'axios';
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios'

function Search() { 
    const [results,setResults] = useState([])
    const search = (e) => {
        
    }
    return (
        <input type='search' onChange={search}/>
)}
export default Search;
