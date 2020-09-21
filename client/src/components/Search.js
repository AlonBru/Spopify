import '../stylesheets/Search.css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchDisplay from './SearchDisplay';

function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const search = (e) => {
    const search = e.target.value;
    console.log(search);
    setQuery(search);
  };

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
        onFocus={() => {
          setOpen(true);
        }}
      />
      <div
        id="searchResults"
        className={open ? 'open' : undefined}
        onClick={(e) => {
          console.log(e.target.tagName);
          if (e.target.tagName !== 'DIV' && e.target.tagName !== 'H2') {
            setOpen(false);
          }
        }}
      >
        {open ? (
          <>
            <div>
              <h2>Songs</h2>
              <SearchDisplay target="song" query={query} />
            </div>
            <div>
              <h2>Albums</h2>
              <SearchDisplay target="album" query={query} />
            </div>
            <div>
              <h2>Artists</h2>
              <SearchDisplay target="artist" query={query} />
            </div>
            <div>
              <h2>Playlists</h2>
              <SearchDisplay target="playlist" query={query} />
            </div>
          </>
        )
          : undefined}
      </div>
    </div>
  );
}
export default Search;
