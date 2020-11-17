import React, { useState, useEffect } from 'react';
import {
  useHistory,useLocation, useParams
} from 'react-router-dom';
import axios from 'axios';
import SearchCard from './SearchCard.js';

function SearchDisplay({ results, target }) {
  const params = useParams()[0].length
  const history = useHistory()
  const location = useLocation()
  const goTo = () => {
    // console.log(value+ location.search)
    history.push(`/search/${target}${location.search}`)
  }
  console.log(params)
  return (
    <div className="SearchDisplay">
      <h2>{target+'s'}</h2>
      <div >
        {results.length
        ?results
        .map((chart) => SearchCard({ ...chart, target }))
        :<h3>Nothing to show..</h3>
        }
      </div>
      {!params
      ?<button className='onlyThis' onClick={goTo}>
        {`search in ${target}s`}
      </button>
      :null}
    </div>
    );
}

export default SearchDisplay;
