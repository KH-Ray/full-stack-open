import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [setBornTo, setSetBornTo] = useState("");

  const [changeAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
    },
  });

  if (!props.show) {
    return null;
  }

  const authors = props.authors.data.allAuthors;

  const submit = (event) => {
    event.preventDefault();

    changeAuthor({ variables: { name, setBornTo } });

    setSetBornTo("");
  };

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={submit}>
        <h3>Set birthyear</h3>
        <div>
          name{" "}
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born{" "}
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
