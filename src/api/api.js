const BASE_URL = "http://localhost8000/";
const GET_CHANNELS = `${BASE_URL}/channel`;

export const getChannelsAPI = () => {
  const options = {
    method: "GET",
  };

  return fetch(GET_CHANNELS, options);
};
