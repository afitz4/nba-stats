import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getAllPlayers, getPlayers } from "./nbaStatsClient";
import { Player } from "./models/Player";
import { Progress, TextInput, Title, Text } from "@mantine/core";
import { setNameAndSimilarName } from "./nameSimilarityCalculator";

function App() {
  const [players, setPlayers] = useState([new Player()]);
  const [name, setName] = useState("");
  const [similarName, setSimilarName] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    getAllPlayers(setPlayers, setLoading, setProgress);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <Title order={1}>basketboardle</Title>
      <Text size="lg">wecome to basketboardle. this will be some worlde type games, but nba type</Text>
        <TextInput
          value={name}
          onChange={(event: any) =>
            setNameAndSimilarName(
              event.currentTarget.value,
              setName,
              setSimilarName,
              players.map((player) => player.getFullName())
            )
          }
        />
        <Title order={2}>{similarName}</Title>
        <Progress value={progress} size="xl" />
        <div>
          {players.map((player) =>
              <li>
                {player.firstName} {player.lastName}
              </li>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
