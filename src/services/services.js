import axios from 'axios';

const nodeApi = axios.create({
  baseURL: process.env.VUE_APP_API_PATH != "" ? process.env.VUE_APP_API_PATH : "http://localhost:5000"
})

export const noteService = () => {
  const getNotes = async () => {
    const url = `/notes`
    const response = await nodeApi.get(url);

    return response.data;
  }

  return {
    getNotes,
  }
}

export default nodeApi;