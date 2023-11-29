import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = async (newAnecdote) => {
  try {
    if (newAnecdote.content.length < 5)
      throw new Error("too short anecdote, must have length 5 or more");

    const res = axios.post(baseUrl, newAnecdote);
    const data = res.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const addVote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
