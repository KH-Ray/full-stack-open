import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    console.error(
      " content of the anecdote must be at least 5 characters long"
    );
    return;
  }

  return axios.post(baseUrl, newAnecdote).then((res) => res.data);
};

export const addVote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
