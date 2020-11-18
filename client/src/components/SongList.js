import '../stylesheets/SongList.css';
import React, { useState } from 'react';
import {
  NavLink,
  useLocation,
  BrowserRouter as Router,
  useRouteMatch as match,
} from 'react-router-dom';
import AddToPlaylist from './addToPlaylist';
import Like from './Like';
import Loading from './Loading';

function SongList({ list, type, id }) {
  const location = useLocation();

  const url = match().ulr;
  if (!list) { return <Loading />; }
  return (
    <div className="z">
      <div className="song header">
        <span />
        <span>#</span>
        <span>{}</span>
        <span style={{ textAlign: 'start' }}>TITLE</span>
        <span />
        <span>length</span>
        <span>PLAYS</span>
      </div>
      {list.map((song, i) => (
        <div key={song.song_id} style={{ position: 'relative' }}>
          <Like
            isLiked={song.is_liked}
            id={song.song_id}
            target="song"
          />
          <NavLink
            key={song.song_id}
            to={`/song/${song.song_id}?from=${type}&id=${id || song.album_id}`}
            activeClassName="selected-song"
            replace
          >

            <div className="song">
              <img src={song.img} alt="" />
              <span>{i + 1}</span>
              <span>{}</span>
              <span style={{ textAlign: 'start' }}>{song.title}</span>
              <AddToPlaylist song={song.song_id} />
              <span>
                {song.length.slice(0, 2) === '00'
                  ? song.length.slice(3)
                  : song.length}
              </span>
              <span>{song.plays || 0}</span>

            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
}
export default SongList;
