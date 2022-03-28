import { Player } from "./models/Player";
import { Team } from "./models/Team";

const root: string = "https://www.balldontlie.io/api/v1/";

const TODAYS_PLAYER_ID = "1234";

const HTTP_TOO_MANY_REQUESTS = 429;

const allPlayersUrl: string = `${root}players?per_page=100`;
const todaysPlayerUrl: string = allPlayersUrl + "/" + TODAYS_PLAYER_ID;

export async function getAllPlayers(setPlayers: Function, setLoading: Function, setProgress: Function) {
  let nextPage = 0;
  let players = [];
  while (nextPage != undefined) {
    const response = await fetchWithFallback(`${allPlayersUrl}&page=${nextPage}`);
    const data = await response.json();
    players.push(...getPlayers(data.data));
    nextPage = data.meta.next_page;
    setProgress(nextPage);
  }
  setLoading(false);
  setPlayers(players);
}

export async function fetchWithFallback(url: string) {
  let response: any;
  let i = 0;
  do {
    // await according to fallback intervals
    await new Promise(f => setTimeout(f, i * 1000));
    i++;
    response = await fetch(url);
  } while (response.status == HTTP_TOO_MANY_REQUESTS);
  return response;
}

export function getPlayers(playerData: any) {
  const newPlayers = [];
  let i = 0;
  while (playerData[i] != undefined) {
    newPlayers.push(dataToPlayer(playerData[i]));
    i++;
  }
  return newPlayers;
}

export function dataToPlayer(data: any) {
  const player = new Player();
  player.id = data["id"];
  player.firstName = data["first_name"];
  player.lastName = data["last_name"];
  player.position = data["position"];
  player.team = dataToTeam(data["team"]);
  return player;
}

export function dataToTeam(data: any) {
  const team = new Team();
  team.id = data["id"];
  team.abbreviation = data["abbreviation"];
  team.city = data["city"];
  team.conference = data["conference"];
  team.division = data["division"];
  team.fullName = data["full_name"];
  team.name = data["name"];
  return team;
}

export async function getTodaysPlayer() {}
