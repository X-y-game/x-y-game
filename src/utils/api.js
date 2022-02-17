import { getChannelsAPI, getRoomAPI, getTeamsAPI } from "../api/api";

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
