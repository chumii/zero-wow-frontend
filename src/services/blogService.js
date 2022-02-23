import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllBlogPosts = async () => {
  const response = await axios.get(`${apiUrl}/blog`);
  return response;
};

export const getBlogPostById = async (id) => {
  const response = await axios.get(`${apiUrl}/blog/get/${id}`);
  return response;
};

export const createBlogPost = (postObj) => {
  axios.post(`${apiUrl}/blog/create`, postObj);
};

export const updateBlogPost = (postObj, id) => {
  axios.put(`${apiUrl}/blog/update/${id}`, postObj);
};

export const deleteBlogPost = async (id) => {
  const response = axios.delete(`${apiUrl}/blog/delete/${id}`);
  return response;
};
