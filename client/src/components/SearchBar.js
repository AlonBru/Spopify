import '../stylesheets/Search.css';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const location  = useLocation()
  
  const search = (e) => {
    const search = e.target.value;
    const pattern = /^\/search\//
    if(location.pathname.match(pattern)){
      history.push(`${location.pathname}?query=${search}`)
    }else{
      history.push(`/search?query=${search}`)
    }
    setQuery(search);
  };
  const openSearch = () => {
    const pattern = /^\/search\//
    if(location.pathname.match(pattern)){
      history.push(`${location.pathname}?query=${query}`)
    }else{
      history.push(`/search?query=${query}`)
    }
  }
  const history = useHistory();
  console.log();
  return (
    <div id="topbar">
      <button onClick={history.goBack}>
        {' '}
        {'<'}
        {' '}
      </button>
      <button onClick={history.goForward}>
        {' '}
        {'>'}
        {' '}
      </button>
      <input
        autoComplete="off"
        id="search"
        type="search"
        placeholder="🔍"
        onChange={search}
        onFocus={openSearch}
      />
    </div>
  );
}
export default Search;
