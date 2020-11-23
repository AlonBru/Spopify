import React, { useState } from 'react';
import axios from 'axios';

function AddToPlaylist({ song }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [status, setStatus] = useState();
  const getPlaylists = () => {
    axios.get('/api/playlist/1')
      .then(({ data }) => {
        console.log(data)
        setPlaylists(data);
      })
      .catch((err) => { console.error(err); });
  };
  const addSong = (song, playlist) => {
    const clearMessage = ()=>{
     setTimeout(() => {
        setStatus();
        setMenuOpen(false)
      },3000)  
    }
    axios.post(`/api/songToPlaylist?song=${song}&playlist=${playlist}`)
      .then((res) => {
        console.log(res)
        setStatus(res.data);
        clearMessage()
      })
      .catch((error) => {
      if(error.response.status===400){
        setStatus(error.response.data)
        return clearMessage()
      }
      console.error(error)
      });
  };//TODO: ensure add to playlist works
  return (
    <span style={{ position: 'relative' }}>
      <button
        className="addToPlaylist"
        onClick={() => {
          getPlaylists();
          setMenuOpen(true);
        }}
      >
        +
      </button>
      <div
        className={
          (menuOpen ? 'addMenu ' : 'hide ') + (status || '')
        }
      >
        <span>choose playlist:</span>
        {
          status?
          status+'!'
          : playlists.map((list) => (
            <button
              key={list.playlist_id}
              onClick={() => { addSong(song, list.playlist_id); }}
            >
              {list.name}
            </button>
          ))
        }
        <button onClick={() => { setMenuOpen(false); }}>close</button>
      </div>
    </span>
  );
}
export default AddToPlaylist;
