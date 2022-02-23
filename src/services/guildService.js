import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getGuilds = async () => {
  const response = await axios.get(`${apiUrl}/guild`);
  return response;
};

export const getGuildById = async (id) => {
  const response = await axios.get(`${apiUrl}/guild/get/${id}`);
  return response;
};

export const createGuild = (name) => {
  axios.post(`${apiUrl}/guild/create/${name}`);
};

export const updateGuild = async (id, guildObj) => {
  await axios.put(`${apiUrl}/guild/update/${id}`, guildObj);
};

export const deleteGuild = (id) => {
  axios.delete(`${apiUrl}/guild/delete/${id}`);
};

export const getGuildProfileFromRio = async (name) => {
  const url = `https://raider.io/api/v1/guilds/profile?region=eu&realm=aegwynn&name=${name}&fields=raid_progression%2Craid_rankings`;
  // const encodedUrl = encodeURI(url);
  // console.log(encodedUrl);
  try {
    const rio = await axios.get(url);
    const profile = await rio.data;
    return profile;
  } catch (error) {
    return error.message;
  }
};
