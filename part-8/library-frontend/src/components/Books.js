import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  if (!props.show) {
    return null;
  }

  const books = props.books.data.allBooks;
  const genres = [];

  for (const book of books) {
    for (const genre of book.genres) {
      if (!genres.includes(genre)) genres.push(genre);
    }
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((a) => (genre ? a.genres.includes(genre) : a))
            .map((a, i) => (
              <tr key={i}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {genres.map((genre, i) => (
        <button
          key={i}
          value={genre}
          onClick={({ target }) => setGenre(target.value)}
        >
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
