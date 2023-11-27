import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ filter }) => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(filter)
    );
  });

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(addVote(anecdote));
    dispatch(showNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(showNotification(""));
    }, 5000);
  };

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}{" "}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
