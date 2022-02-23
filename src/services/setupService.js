import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllSetups = async () => {
  try {
    const response = await axios.get(`${apiUrl}/setup`);
    const data = await response.data;
    return data;
    // setBosses(data[0].bosses);
    // setId(data[0]?._id ?? null);
  } catch (err) {
    console.error(err);
    alert("error while fetching all setups");
  }
};

export const getLatestSetup = async () => {
  try {
    const response = await axios.get(`${apiUrl}/setup`);
    const data = await response.data;
    console.log(data);
    return data._id;
  } catch (err) {
    console.error(err);
    alert("error while fetching all setups");
  }
};

export const getSetupById = async (
  setBosses,
  id,
  setRaidSlug,
  getBossesOfRaidSelected
) => {
  try {
    const response = await axios.get(`${apiUrl}/setup/get/${id}`);
    const bosses = await response.data.bosses;
    // console.log(response.data);
    // console.log(response.data.raid_slug);
    // return response;
    // console.log(bosses);
    setRaidSlug(response.data.raid_slug);
    getBossesOfRaidSelected(response.data.raid_slug);
    setBosses(bosses);
  } catch (error) {
    console.error(error);
    alert("error while fetching single setups");
  }
};

export const getRosterOfSetupById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/setup/get/${id}`);
    const roster = await response.data.bosses[0].roster;
    return roster;
  } catch (error) {
    console.error(error);
  }
};

export const saveSetup = async (postObj) => {
  try {
    await axios.put(`${apiUrl}/setup/save`, postObj);
    // alert("Hurray, Successfully saved setup");
  } catch (err) {
    alert("Error in saveStep");
    console.error(err);
  }
};

export const deleteSetup = async (id) => {
  const response = axios.delete(`${apiUrl}/setup/delete/${id}`);
  return response;
};
