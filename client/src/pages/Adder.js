import React, { useState } from 'react';
import {
  Link, Switch, Route, useRouteMatch, useParams,
} from 'react-router-dom';
import axios from 'axios';
import AddArtist from '../components/AddArtist.js';
import AddAlbum from '../components/AddAlbum.js';
import AddSong from '../components/AddSong.js';

function Adder() {
  console.log(match);

  const [whatToAdd, setWhatToAdd] = useState('');
  const [status, setStatus] = useState();

  function pickTarget(e) {
    setWhatToAdd(e.target.value);
  }

  function sendData(data) {
    axios.post(`/${whatToAdd}`, data)
      .then((res) => {
        setStatus(res.data);
      })
      .catch((e) => {
        setStatus(e.data);
      });
  }
  function testConnection() {
    axios.get('/ping')
      .then((res) => {
        setStatus(res.data);
      })
      .catch((e) => {
        setStatus(e.data);
      });
  }
  const drawInput = () => {
    switch (whatToAdd) {
      case 'artist':
        return <AddArtist sendData={sendData} sendStatus={setStatus} />;
      case 'album':
        return <AddAlbum sendData={sendData} sendStatus={setStatus} />;
      case 'song':
        return <AddSong sendData={sendData} sendStatus={setStatus} />;
      default:
        return <p> please select what you want to add</p>;
    }
  };
  let match = useRouteMatch();

  return (
    <div>
      <h2>Add What?</h2>
      <select defaultValue="" name="target" onChange={pickTarget}>
        <Link to={`${match.url}/Song`}>
          {' '}
          <option value="song">Songs</option>
          {' '}
        </Link>
        <Link to={`${match.url}/Song`}>
          {' '}
          <option value="song">Songs</option>
          {' '}
        </Link>
        <Link to={`${match.url}/Song`}>
          {' '}
          <option value="song">Songs</option>
          {' '}
        </Link>
        <option value="song"><Link to={`${match.url}/Song`}>Songs</Link></option>
      </select>
      <ul>
        <li>
          <Link to={`${match.url}/Song`}>Songs</Link>
        </li>
        <li>
          <Link to={`${match.url}/Album`}> Albums </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
            that build on the /topics URL path. You can think of the
            2nd <Route> here as an "index" page for all topics, or
            the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  const { topicId } = useParams();
  return (
    <h3>
      Requested topic ID:
      {topicId}
    </h3>
  );
}
//     return (
//         <div id='adder'>
//             <select defaultValue='' name='target' onChange={pickTarget}>
//                 <option value=''  disabled >what to add?</option>
//                 <option value='song'>add a song</option>
//                 <option value='album' >add an album</option>
//                 <option  value='artist' >add an artist</option>
//                 <option  value='artist' ><a>gold</a></option>

//             </select>

//             {drawInput()}
//             {/* <button onClick={() => {setStatus({status:'success',message:'sent.'})}}>setStatus</button> */}
//            <button onClick={sendData}>test Error</button>
//            <button onClick={testConnection}>test connection</button>
//             <p className={status?status.status:''}>{status?status.message:''}</p>
//         </div>
//   )

export default Adder;
