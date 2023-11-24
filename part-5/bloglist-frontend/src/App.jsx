import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sort, setSort] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
      setIsSending(false);
    });
  }, [isSending]);

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
          id="username"
        />
      </div>
      <div>
        password{" "}
        <input
          type="Password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );

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
      setIsSending(true);
    });
  };

  const updateBlog = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    blogService.update(id, changedBlog).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    });
  };

  const removeBlog = (id) => {
    blogService.remove(id).then(() => setBlogs(blogs.map((blog) => blog)));
  };

  const blogsDisplay = () => {
    const blogsCopy = [...blogs];

    /* eslint-disable */
    return sort === "ascending"
      ? blogsCopy.sort((a, b) => a.likes - b.likes)
      : sort === "descending"
      ? blogsCopy.sort((a, b) => b.likes - a.likes)
      : blogs;
    /* eslint-enable */
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
            {user.name} logged in{" "}
            <button onClick={handleLogout} className="logoutButton">
              logout
            </button>
          </div>
          <Togglable buttonLabel="new blog">
            {
              <BlogForm
                title={title}
                author={author}
                url={url}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setUrl={setUrl}
                addBlog={addBlog}
              />
            }
          </Togglable>
        </>
      )}
      <select onChange={(event) => setSort(event.target.value)}>
        <option value="">---</option>
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
      </select>
      {blogsDisplay().map((blog, i) => (
        <Blog
          key={i}
          blog={blog}
          user={user}
          handleIsSending={setIsSending}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default App;
