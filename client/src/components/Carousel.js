import React, { useState, useEffect } from 'react';
import {
  Link, Switch, Route, useRouteMatch, useParams,
} from 'react-router-dom';
import axios from 'axios';
import Card from './Card.js';

function Carousel({ target }) {
  const [topCharts, setTopCharts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios.get(`/api/top_${target}`)
      .then(({ data }) => {
        console.log(target, data);
        setTopCharts(data);
      })
      .catch((err) => { console.error(err); });
  }, []);
  if (topCharts.length === 0) { return <h3>Nothing to show..</h3>; }
  return (
    <div className="carousel">
      <div className="display">
        <button
          value="◀"
          className="left"
          onClick={() => { setPage(page - 5); }}
          disabled={page === 0}
        />
        <div className="charts">
          {topCharts
            .slice(page, page + 5)
            .map((chart) => Card({ ...chart, target, key: chart.id }))}
        </div>
        <button
          value="▶"
          className="right"
          onClick={() => { setPage(page + 5); }}
          disabled={topCharts.length - page <= 5}
        />
      </div>
    </div>
  );
}

export default Carousel;
