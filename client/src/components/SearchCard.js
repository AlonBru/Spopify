import React, { useState, useEffect } from 'react';
import {
  Link, Switch, Route, useRouteMatch, useParams,
} from 'react-router-dom';

function SearchCard({
  name, img, artist_name, album, id, target,
}) {
  return (
    <div key={id} className="searchCard">
      <Link
        to={`/${target}/${id}${
          target === 'song'
            ? `?from=album&id=${album}`
            : ''}`}
      >
        <img src={img} />
        <h4>
          {name.length < 25
            ? name
            : `${name.slice(0, 24).trim()}...`}
        </h4>
      </Link>
      {artist_name
        ? (
          <p>
            by:
            {' '+artist_name}
          </p>
        )
        : undefined}
    </div>
  );
}

export default SearchCard;
