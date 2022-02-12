const BASE_URL = "http://localhost8000/";
const CHANNELS = `${BASE_URL}/channel`;
const MAKE_ROOM = `${BASE_URL}/room`;

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
