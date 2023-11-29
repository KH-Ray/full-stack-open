import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, addVote } from "../request";
import { useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload.content;

    case "ERROR":
      return action.payload;

    default:
      return false;
  }
};

const App = () => {
  const [notify, notifyDispatch] = useReducer(notificationReducer, "");
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });

    notifyDispatch({ type: "SHOW", payload: anecdote });
    setTimeout(() => {
      notifyDispatch({ type: "HIDE", payload: "" });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => getAnecdotes(),
    retry: 1,
  });

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notify={notify} />
      <AnecdoteForm dispatch={notifyDispatch} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
