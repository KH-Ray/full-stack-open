import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import LoginForm from "./components/LoginForm";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const [page, setPage] = useState("authors");
  const client = useApolloClient();

  if (authors.loading || books.loading) return;

  const logout = () => {
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!localStorage.getItem("library-user-token") ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} authors={authors} />
      <Books show={page === "books"} books={books} />
      <NewBook show={page === "add"} />
      <LoginForm show={page === "login"} setPage={setPage} />
    </div>
  );
};

export default App;
