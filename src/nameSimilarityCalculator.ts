import distance from "jaro-winkler";

export function setNameAndSimilarName(input: string, setName: Function, setSimilarName: Function, playerNames: Array<string>) {
  setName(input);
  let similarName = '';
  let maxSimilarity = -1;
  playerNames.forEach(playerName => {
    let currDistance = distance(input, playerName);
    if (currDistance > maxSimilarity) {
      maxSimilarity = currDistance;
      similarName = playerName;
    }
  });
  setSimilarName(similarName);
}