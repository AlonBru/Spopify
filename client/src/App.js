import React from 'react';
import './App.css';
import ItemList from './components/ItemList.js';
import Adder from './components/Adder.js';

function App() {

  return (
      <main>
        <Adder/>
        <h1>ELLO MATE</h1>
        {/* <ItemList target='artist'/>
        <ItemList target='album'/>
        <ItemList target='song'/> */}

      </main>
  )
}

export default App;
