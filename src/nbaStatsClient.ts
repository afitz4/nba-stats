import { Player } from "./models/Player";

const root: string = "https://www.balldontlie.io/api/v1/";

const TODAYS_PLAYER_ID = "1234";

const allPlayersUrl: string = root + "players";
const todaysPlayerUrl: string = allPlayersUrl + "/" + TODAYS_PLAYER_ID; 

export async function getPlayers(setPlayers: Function) {
  const response = await fetch(allPlayersUrl);
  const data = await response.json();
  const playerData = data.data;
  console.log(data);
  const player = new Player();
  player.firstName = playerData[0]["first_name"];
  setPlayers([player]);
  return [player];
}

export async function getTodaysPlayer() {

}