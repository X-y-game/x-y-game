export function getMiddleResult(result, score, round) {
  const midResult = Array(round).fill(Array(4).fill(["", 0]));
  for (let r = 0; r < round; r += 1) {
    for (let i = 0; i < 4; i += 1) {
      midResult[r][i] = [result[r][i], score[r][i]];
    }
  }
  return midResult;
}

export function getCurrentScore(score, round, team) {
  let teamScore = 0;
  if (score) {
    for (let r = 0; r < round; r += 1) {
      teamScore += score[r][team - 1];
    }
  }
  return teamScore;
}

export function sumScores(scores) {
  let team1 = 0;
  let team2 = 0;
  let team3 = 0;
  let team4 = 0;

  scores.forEach((round) => {
    team1 += round[0];
    team2 += round[1];
    team3 += round[2];
    team4 += round[3];
  });

  return [team1, team2, team3, team4];
}

export function checkSpecialRound(round) {
  switch (round) {
    case 5:
      return "5라운드에서는 점수의 가중치가 3배 입니다!";
    case 8:
      return "8라운드에서는 점수의 가중치가 5배 입니다!!";
    case 10:
      return "10라운드에서는 점수의 가중치가 10배 입니다!!!";
    default:
      return null;
  }
}

function checkRoundResult(teams, roundData) {
  const copyTeams = teams;
  roundData.forEach((teamScore, index) => {
    const check = Math.sign(teamScore);
    if (check === 1) {
      copyTeams[index][0] += 1;
    } else {
      copyTeams[index][1] += 1;
    }
  });
  return copyTeams;
}

export function sumResults(roundData) {
  const teamObj = { 0: [0, 0], 1: [0, 0], 2: [0, 0], 3: [0, 0] };
  const results = [];
  let resultsObj = {};

  roundData.forEach((round) => {
    resultsObj = checkRoundResult(teamObj, round);
  });

  const resultsArr = Object.values(resultsObj);

  resultsArr.forEach((teamData) => {
    const resultStr = `${teamData[0]}승 ${teamData[1]}패`;
    results.push(resultStr);
  });

  return results;
}

export function makeData(data) {
  const tableData = [];
  for (let i = 0; i < 4; i += 1) {
    const teamTemplate = {
      team: "",
      score: "",
      result: "",
    };
    teamTemplate.team = `${i + 1}`;
    teamTemplate.score = data.scores[i];
    teamTemplate.result = data.results[i];
    tableData.push(teamTemplate);
  }

  return tableData;
}
