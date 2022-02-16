/* eslint-disable no-plusplus */
// 중간/최종 결과
export function getMiddleResult(result, score, round) {
  const midResult = Array(round).fill(Array(4).fill(["", 0]));
  for (let r = 0; r < round; r++) {
    for (let i = 0; i < 4; i++) {
      midResult[r][i] = [result[r][i], score[r][i]];
    }
  }
  return midResult;
}

export function getCurrentScore(score, round, team) {
  let teamScore = 0;
  if (score) {
    for (let r = 0; r < round; r++) {
      teamScore += score[r][team.slice(4) - 1];
    }
  }
  return teamScore;
}
