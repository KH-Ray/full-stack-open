const Reccomendation = (props) => {
  if (!props.show) {
    return null;
  }

  const books = props.books.data.allBooks;
  const favoriteGenre = props.currentUser.data.me.favoriteGenre;

  return (
    <div>
      <h2>reccomendations</h2>

      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((a) => a.genres.includes(favoriteGenre))
            .map((a, i) => (
              <tr key={i}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reccomendation;
