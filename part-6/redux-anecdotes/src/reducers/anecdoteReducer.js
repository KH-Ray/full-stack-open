import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteIncrease(state, action) {
      const id = action.payload.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changeAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changeAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteIncrease, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const id = anecdote.id;
    const changeAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const newVote = await anecdoteService.updateVote(changeAnecdote, id);
    dispatch(voteIncrease(newVote));
  };
};

export default anecdoteSlice.reducer;
