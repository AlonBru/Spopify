import React, { useState } from 'react';
import axios from 'axios';

function Lyrics({ lyrics }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: 'relative' }}>
      <button
        className="lyricsButton"
        onClick={() => { setOpen(!open); }}
      >
        Lyrics
      </button>
      <div
        className={
          (open ? 'lyrics' : 'hide')
        }
      >
        {/* <button className="close" onClick={() => { setOpen(false); }}>close</button> */}
        <p>
        <button
         className="lyricsButton"
         onClick={() => { setOpen(!open); }}
        title='close'
        >
          Lyrics
        </button>
          <p>to close click "Lyrics"</p>
          :
          {`\n${lyrics}`}
        </p>
      </div>
    </span>
  );
}
export default Lyrics;
