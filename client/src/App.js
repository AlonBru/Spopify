import React from 'react';
import './App.css';
// import Adder from './pages/Adder.js';
import Song from './pages/Song.js';
import Artist from './pages/Artist.js';
import Album from './pages/Album.js';
import error404 from './pages/error404.js';
import Home from './pages/Home.js';
import Search from './components/Search.js';
import Nav from './components/Nav.js';
import {
    BrowserRouter as Router,
    Switch,
    Route
    } from "react-router-dom";
  

function App() { 
    return (
        <div id='app'>
        <Router>
            <Nav/>
            <Search />
            <main>
                <Switch>
                    {/* <Route path="/adder" component={Adder} /> */}
                    <Route path="/song/:id" component={Song} />
                    <Route path="/artist/:id" component={Artist} />
                    <Route path="/album/:id" component={Album} />
                    <Route exact path="/"  component={Home} />
                    <Route component={error404} />
                    
                </Switch>
            </main>
        </Router>
        </div>
  );
}

export default App;
