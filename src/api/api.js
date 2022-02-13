const BASE_URL = "http://localhost:8000";
const CHANNELS = `${BASE_URL}/channel`;
const MAKE_ROOM = `${BASE_URL}/room`;
const MAKE_TEAM = `${BASE_URL}/team`;

export const getChannelsAPI = () => {
  const options = {
    method: "GET",
  };

  return fetch(CHANNELS, options);
};

export const makeChannelAPI = (title, password) => {
  const data = {
    title,
    password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(CHANNELS, options);
};

export const makeRoomAPI = (channelId, title) => {
  const data = {
    title,
    channelId,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(MAKE_ROOM, options);
};

export const getRoomAPI = (channelId) => {
  const GET_ROOM = `${MAKE_ROOM}/${channelId}`;
  const options = {
    method: "GET",
  };

  return fetch(GET_ROOM, options);
};

export const makeTeamAPI = (title, roomId) => {
  const data = {
    title,
    roomId,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(MAKE_TEAM, options);
};

export const getTeamsAPI = (roomId) => {
  const GET_TEAMS = `${MAKE_TEAM}/${roomId}`;
  const options = {
    method: "GET",
  };

  return fetch(GET_TEAMS, options);
};

export const removeChannel = (channelId) => {
  const data = {
    channelId,
  };

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(CHANNELS, options);
};

export const removeRoomAPI = (roomId) => {
  const data = {
    roomId,
  };

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(MAKE_ROOM, options);
};

export const removeTeamAPI = (teamId) => {
  const data = {
    teamId,
  };

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(MAKE_TEAM, options);
};
