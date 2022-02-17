import { getChannelsAPI, getRoomAPI, getTeamsAPI, removeChannelAPI, removeRoomAPI, removeTeamAPI } from "../api/api";

export async function getChannels(setChannels) {
  const channelList = await (await getChannelsAPI()).json();
  return setChannels(channelList);
}

export async function getRooms(currentChannel, setRooms) {
  const rooms = await (await getRoomAPI(currentChannel)).json();
  setRooms(rooms);
}

export async function getTeams(currentRoom, setTeams) {
  const teams = await (await getTeamsAPI(currentRoom)).json();
  setTeams(teams);
}

export async function removeChannel(channelId) {
  await removeChannelAPI(channelId);
}

export async function removeRoom(roomId) {
  await removeRoomAPI(roomId);
}

export async function removeTeam(teamId) {
  await removeTeamAPI(teamId);
}
