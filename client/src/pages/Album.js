import '../stylesheets/Album.css';
import React, { useState, useEffect } from 'react';
import {
  Link,
  useLocation,
  BrowserRouter as Router,
  // useRouteMatch,
} from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading.js';
import SongList from '../components/SongList.js';

function Album({ match }) {
  const [album, setAlbum] = useState();
  const [songs, setSongs] = useState();
  useEffect(getAlbum, []);
  const location = useLocation();
  function getAlbum() {
    axios.get(`/api/album/${match.params.id}`)
      .then(({ data }) => {
        if (Array.isArray(data)) { data = data[0]; }
        setAlbum(data);
        getSongs(data);
      })
      .catch((e) => console.error(e));
  }
  function getSongs(album) {
    axios.get(`/api/getByAlbum/songs?id=${album.album_id}`)
      .then(({ data }) => {
        console.log(data);
        setSongs(data);
      })
      .catch((e) => console.error(e));
  }
  if (!album) { return <Loading />; }
  return (
    <div id="albumPage">
      <div className="cover">
        <img src={album.cover_img} />
        <h2>{album.name}</h2>
        <h4>
          By:
          <Link to={`/artist/${album.artist_id}`}>
            {` ${album.artist}`}
          </Link>
        </h4>
        <span>
          {`${album.released?album.released.slice(0, 4):'someyear'} `}
          |
          {songs && ` ${songs.length}`}
          {' '}
          songs,
          {` ${Math.round(album.total_length / 60)}`}
          {' '}
          minutes
        </span>
      </div>
      <div className="lists">
        <SongList list={songs} type="album" id={album.album_id} />
      </div>
    </div>
  );
}
export default Album;
