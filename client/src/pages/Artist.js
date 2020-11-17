import '../stylesheets/Artist.css';
import React, { useState, useEffect } from 'react';
import {
  Switch,
  useLocation,
  NavLink,
  BrowserRouter as Router,
  // useRouteMatch,
  Route, useRouteMatch,
} from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading.js';
import SongList from '../components/SongList.js';
import AlbumList from '../components/AlbumList.js';

function Artist({ match, location }) {
  console.log(location);
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [songs, setSongs] = useState();
  useEffect(getArtist, []);
  console.log(match);
  function getArtist() {
    axios.get(`/api/artist/${match.params.id}`)
      .then(({ data }) => {
        if (Array.isArray(data)) { data = data[0]; }
        setArtist(data);
        console.log(data);
        getAlbums(data);
        getSongs(data);
      })
      .catch((e) => console.error(e));
  }
  function getAlbums(artist) {
    console.log('arts', artist);
    axios.get(`/api/getByArtist/albums?id=${artist.artist_id}`)
      .then(({ data }) => {
        setAlbums(data);
        console.log('albs', data);
      })
      .catch((e) => console.error(e));
  }
  function getSongs(artist) {
    axios.get(`/api/getByArtist/songs?id=${artist.artist_id}`)
      .then(({ data }) => {
        setSongs(data);
      })
      .catch((e) => console.error(e));
  }
  if (!artist) { return <Loading />; }
  return (
    <div id="artistPage">
      <div
        className="cover"
        // implement cover for names too long for current cover
        style={{ backgroundImage: `url(${`${artist.img}?random=${artist.artist_id}`})` }}
      >
        <h1 className={artist.name.length > 18 ? 'longname' : undefined}>{artist.name}</h1>
        <button className="follow">Follow</button>
        <p>
          Play Count:
          {artist.play_count || 0}
        </p>

      </div>
      <div className="lists">
        <h2>Top Songs</h2>
        <SongList list={songs} type="Album" />
        <h2>Albums</h2>
        <AlbumList list={albums} />
      </div>
    </div>
  );
}
export default Artist;
