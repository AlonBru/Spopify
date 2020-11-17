import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Link, Switch, Route, useRouteMatch, useParams,
} from 'react-router-dom';
import axios from 'axios';
import Song from './Song'
import Album from './Album'
import Artist from './Artist'
function SearchDisplay() {
  const [results, setResults] = useState([]);

  // useEffect(() => {
  //   if (!query.length) {
  //     setResults([]);
  //     return;
  //   }
  //   axios.get(`/search/${target}/${query}`)
  //     .then(({ data }) => {
  //       console.log(data);
  //       setResults(data);
  //     })
  //     .catch((e) => { console.error(e); });
  // }, [query]);
  // if (results.length === 0) { return <h3>Nothing to show..</h3>; }
  return (
    <Router>
      <Switch>
        {/* <Route path="/adder" component={Adder} /> */}
        <Route path="/search/song" component={Song} />
        <Route path="/search/album" component={Album} />
        <Route path="/search/artist" component={Artist} />
      </Switch>
  </Router>
  );
}

export default SearchDisplay;
