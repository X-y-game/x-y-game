const BASE_URL = "http://localhost8000/";
const CHANNELS = `${BASE_URL}/channel`;

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
