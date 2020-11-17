import React, { useState, useEffect } from 'react';
import {
  Link,
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
    history.push()
  }
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
      {!params&&results.length>=3
      ?<Link className='onlyThis' to={`/search/${target}${location.search}`}>
        {`~ more in ${target}s ~`}
      </Link>
      :null}
    </div>
    );
}

export default SearchDisplay;
