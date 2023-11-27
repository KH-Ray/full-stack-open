import { useState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [filter, setFilter] = useState("");

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter filter={filter} setFilter={setFilter} />
      <AnecdoteList filter={filter} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
