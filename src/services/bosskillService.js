import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllBossKills = async () => {
  const response = await axios.get(`${apiUrl}/killfeed`);
  return response;
};

export const getBossKillById = async (id) => {
  const response = await axios.get(`${apiUrl}/killfeed/get/${id}`);
  return response;
};

export const createBossKill = async (
  bossKillObj,
  raid_slug,
  boss_slug,
  difficulty
) => {
  await axios.post(
    `${apiUrl}/killfeed/create/${raid_slug}/${boss_slug}/${difficulty}`,
    bossKillObj
  );
};

// export const updateBossKill = (bossKillObj, id) => {
//   axios.put(`${apiUrl}/blog/update/${id}`, bossKillObj);
// };

export const deleteBossKill = async (id) => {
  const response = axios.delete(`${apiUrl}/killfeed/delete/${id}`);
  return response;
};

export const getBossesOfRaid = async (raid_slug) => {
  const response = await axios.get(`${apiUrl}/boss/${raid_slug}`);
  return response;
};
