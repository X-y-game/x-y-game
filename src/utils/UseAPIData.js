import { getTeamsAPI } from "../api/api";

// 팀 가져오기 db
export async function getTeams(roomDBID) {
  const response = await (await getTeamsAPI(roomDBID)).json();
  return response.teamLists;
}

export async function getTeams1(roomDBID) {
  const response = await (await getTeamsAPI(roomDBID)).json();
  return response.teamLists;
}
