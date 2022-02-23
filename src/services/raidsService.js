import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllRaids = async (setRaids) => {
  try {
    const response = await axios.get(`${apiUrl}/raids`);
    const data = await response.data;
    setRaids(data);
  } catch (err) {
    alert("Error in raidsService");
    console.error(err);
  }
};

export const getAllRaidsTwo = async () => {
  try {
    const response = await axios.get(`${apiUrl}/raids`);
    const data = await response.data;
    return data;
  } catch (err) {
    alert("Error in raidsService");
    console.error(err);
  }
};

export const updateRaid = async (raidObj, id) => {
  await axios.put(`${apiUrl}/raids/update/${id}`, raidObj);
};

// export const getBlogPostById = async (id) => {
//   const response = await axios.get(`${apiUrl}/blog/get/${id}`);
//   return response;
// };

// export const createBlogPost = (bookObj) => {
//   axios.post(`${apiUrl}/blog/create`, bookObj);
// };

// export const deleteBlogPost = (id) => {
//   axios.delete(`${apiUrl}/blog/delete/${id}`);
// };
