import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllRecruits = async () => {
  try {
    const response = await axios.get(`${apiUrl}/recruit`);
    const data = await response.data;
    return data;
  } catch (err) {
    alert("Error in recruitService");
    console.error(err);
  }
};

export const getRecruitById = async (id) => {
  const response = await axios.get(`${apiUrl}/recruit/${id}`);
  return response;
};

// export const createBlogPost = (bookObj) => {
//   axios.post(`${apiUrl}/blog/create`, bookObj);
// };

export const updateRecruit = async (recruitObj, id) => {
  await axios.put(`${apiUrl}/recruit/update/${id}`, recruitObj);
};

// export const deleteBlogPost = (id) => {
//   axios.delete(`${apiUrl}/blog/delete/${id}`);
// };
