import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllMember = async () => {
  const response = await axios.get(`${apiUrl}/member`);
  return response;
};

export const getMemberById = async (id) => {
  const response = await axios.get(`${apiUrl}/member/get/${id}`);
  return response;
};

export const createNewMember = async (name, fixmainrole, realname) => {
  await axios.post(
    `${apiUrl}/member/create/${name}/${fixmainrole}/${realname}`
  );
};

export const updateMember = async (id, memberObj) => {
  await axios.put(`${apiUrl}/member/update/${id}`, memberObj);
};

export const deleteMember = async (id) => {
  const response = axios.delete(`${apiUrl}/member/delete/${id}`);
  return response;
};

export const getMemberProfileFromRaiderIo = async (name, req, res) => {
  const escapedName = encodeURIComponent(name);
  const url = `https://raider.io/api/v1/characters/profile?region=eu&realm=aegwynn&name=${escapedName}&fields=gear%2Ccovenant`;
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
