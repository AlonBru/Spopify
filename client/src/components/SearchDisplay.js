import React, { useState, useEffect } from 'react';
import {
  Link, Switch, Route, useRouteMatch, useParams,
} from 'react-router-dom';
import axios from 'axios';
import SearchCard from './SearchCard.js';

function SearchDisplay({ results, target }) {
  
  return (
    <div>
      <h2>{target+'s'}</h2>
      <div className="SearchDisplay">
        {results.length
        ?results
        .map((chart) => SearchCard({ ...chart, target }))
        :<h3>Nothing to show..</h3>
        }
      </div>
    </div>
    );
}

export default SearchDisplay;
