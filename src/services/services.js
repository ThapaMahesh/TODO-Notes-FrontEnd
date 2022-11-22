import axios from 'axios';

export const noteService = () => {
  const getNotes = async () => {
    const url = `http://localhost:3000/notes`
    const response = await axios.get(url);

    return response.data;
  }

  return {
    getNotes,
  }
}
