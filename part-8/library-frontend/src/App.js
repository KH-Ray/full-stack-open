import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, CURRENT_USER } from "./queries";
import LoginForm from "./components/LoginForm";
import Reccomendation from "./components/Reccomendation";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const currentUser = useQuery(CURRENT_USER);
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook.title} added`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return { allBooks: allBooks.concat(addedBook) };
      });
    },
  });

  if (authors.loading || books.loading) return;

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!localStorage.getItem("library-user-token") && !token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} authors={authors} />
      <Books show={page === "books"} books={books} />
      <NewBook show={page === "add"} />
      <Reccomendation
        show={page === "recommend"}
        books={books}
        currentUser={currentUser}
      />
      <LoginForm
        show={page === "login"}
        setPage={setPage}
        setToken={setToken}
      />
    </div>
  );
};

export default App;
