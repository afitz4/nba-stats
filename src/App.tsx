import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllPlayers, getPlayers } from './nbaStatsClient';
import { Player } from './models/Player';
import { TextInput, Title } from '@mantine/core';
import { setNameAndSimilarName } from './nameSimilarityCalculator';


function App() {
  
  const [players, setPlayers] = useState([new Player()]);
  const [name, setName] = useState('');
  const [similarName, setSimilarName] = useState('');

  useEffect(() => {
    getAllPlayers(setPlayers);
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextInput value={name} onChange={(event: any) => setNameAndSimilarName(event.currentTarget.value, setName, setSimilarName, players.map(player => player.getFullName()))} />;
        <Title order={1}>{similarName}</Title>
        <div>
          {players.map(player => player.firstName == undefined ? "loading" : <li>{player.firstName} {player.lastName}</li>)}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
