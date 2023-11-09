import axios from "axios";

const API_URL = "http://localhost:1000/";

export const GetUserAPI = async () => {
  // console.log(id);
  const response = await axios.get(`${API_URL}getallStudent`);
  return response.data;
};

export const GetUserByID = async (id) => {
  // console.log(id);
  const response = await axios.post(`${API_URL}studentById`, { id: id });
  return response.data;
};

export const UserUpdateByID = async (state) => {
  // console.log(id);
  const response = await axios.put(`${API_URL}studentUpdate`, state);
  return response.data;
};

export const CreateUserByAdmin = async (state) => {
  // console.log(id);
  const response = await axios.post(`${API_URL}create`, state);
  return response.data;
};
export const deleteUserByAdmin = async (id) => {
  console.log("ooooooo" + id);
  const response = await axios.post(`${API_URL}deleteStudent`, {
    id: id,
  });
  return response.data;
};
