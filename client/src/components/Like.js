import React, { useState } from 'react';
import axios from 'axios';

function Like({ isLiked, id, target }) {
  const [colorIn, setColorIn] = useState(isLiked);
  const SetLike = () => {
    setColorIn(!colorIn);
    axios.put(`/setLike/${target}/${id}`, { like: isLiked ? 0 : 1 })
      .then(({ data }) => {
      })
      .catch((err) => { console.error(err); });
  };
  return (
    <span
      style={{ position: 'relative' }}
    >
      <button
        className={`${colorIn ? ' liked' : ' unliked'} likeButton`}
        onClick={SetLike}
      />
    </span>
  );
}
export default Like;
