import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNotappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNotappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage("wrong username or password");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="Password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => {
    return (
      <>
        <h2>create new</h2>

        <form>
          <div>
            title:{" "}
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:{" "}
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:{" "}
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>

          <button type="submit" onClick={addBlog}>
            create
          </button>
        </form>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));

      setMessage(`a new blog ${title} by ${author}`);
      setTimeout(() => {
        setMessage("");
      }, 5000);

      setTitle("");
      setAuthor("");
      setUrl("");
    });
  };

  return (
    <div>
      {user === null ? <h2>log in to application</h2> : <h2>blogs</h2>}
      {message.includes("wrong") ? (
        <Notification message={message} color="red" />
      ) : (
        <Notification message={message} color="green" />
      )}
      {!user && <>{loginForm()}</>}
      {user && (
        <>
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          {blogForm()}
        </>
      )}
    </div>
  );
};

export default App;
