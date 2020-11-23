import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function AlbumList({ list }) {
  if (!list) { return <Loading />; }
  return (
    <div className="albumList">

      {list.map((album, i) => (
        <Link key={album.album_id} to={`/album/${album.album_id}`}>
          <div key={album.album_id} className="album">
            <img src={album.cover_img} alt="coverimg" />
            <span style={{}}>
              {album.name.length < 36
                ? album.name
                : `${album.name.slice(0, 36)}...`}
            </span>
            <span className="date">{album.released.slice(0, 4)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default AlbumList;
