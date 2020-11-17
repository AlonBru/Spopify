import React, { useState } from 'react';
import './stylesheets/App.css';
// import Adder from './pages/Adder.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Song from './pages/Song.js';
import Search from './pages/Search';
import Artist from './pages/Artist.js';
import Album from './pages/Album.js';
import Playlist from './pages/Playlist.js';
import error404 from './pages/error404.js';
import Home from './pages/Home.js';
import SearchBar from './components/SearchBar.js';
import Nav from './components/Nav.js';
import SearchDisplay from './components/SearchDisplay';

function App() {
  const [showMiniHeader, setShowMiniHeader] = useState(false);
  const darken = (e) => {
    const currentScroll = e.target.scrollTop;
    if (currentScroll > 106 && !showMiniHeader) {
      setShowMiniHeader(true);
    }
    if (currentScroll <= 106 && showMiniHeader) {
      setShowMiniHeader(false);
    }
  };
  return (
    <div
      id="app"
      onScroll={darken}
    >
      <Router>
        <Nav />
        <main>
          <SearchBar />
          <Switch>
            {/* <Route path="/adder" component={Adder} /> */}
            <Route path="/song/:id" component={Song} />
            <Route path="/album/:id" component={Album} />
            <Route path="/artist/:id" component={Artist} />
            <Route path="/playlist/:id" component={Playlist} />
            <Route exact path="/search*">
              <Search />
            </Route>
            <Route exact path="/">
              <Home match mini={showMiniHeader} />
            </Route>
            <Route component={error404} />

          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
