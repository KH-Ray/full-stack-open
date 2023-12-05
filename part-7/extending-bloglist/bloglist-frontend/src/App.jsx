import "./index.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "./services/blogs";
import loginService from "./services/login";
import usersService from "./services/users";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { notificate } from "./reducers/notificationReducer";
import { fetchBlog, appendBlog } from "./reducers/blogReducer";
import { logoutUser, setUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersView from "./components/UsersView";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import { Button, Form, ListGroup, Nav, Navbar } from "react-bootstrap";

const App = () => {
  const [allUser, setAllUser] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(fetchBlog(blogs));
      setIsSending(false);
    });
  }, [isSending, dispatch]);

  useEffect(() => {
    usersService.getUsers().then((users) => {
      setAllUser(users);
    });
  }, [isSending]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNotappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const showNotification = (content) => {
    dispatch(notificate(content));
    setTimeout(() => {
      dispatch(notificate(""));
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNotappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));

      setUsername("");
      setPassword("");
    } catch (error) {
      showNotification("wrong username or password");
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(logoutUser());
  };

  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="Password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </Form.Group>
      <Button
        style={{ display: "block", width: "100%", textTransform: "capitalize" }}
        className="mb-3"
        variant="primary"
        type="submit"
        id="login-button"
      >
        login
      </Button>
    </Form>
  );

  const blogView = () => {
    return (
      <>
        {user && (
          <Togglable buttonLabel="New Blog">
            <BlogForm
              title={title}
              author={author}
              url={url}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
              addBlog={addBlog}
            />
          </Togglable>
        )}
        <Form.Group
          className="mb-3"
          onChange={(event) => setSort(event.target.value)}
        >
          <Form.Label>Sort Blogs by Likes</Form.Label>
          <Form.Select>
            <option value="">---</option>
            <option value="ascending">ascending</option>
            <option value="descending">descending</option>
          </Form.Select>
        </Form.Group>
        <ListGroup>
          {blogsDisplay().map((blog, i) => (
            <ListGroup.Item key={i}>
              <Blog
                blog={blog}
                user={user}
                handleIsSending={setIsSending}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
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
      dispatch(appendBlog(returnedBlog));

      showNotification(`a new blog ${title} by ${author}`);

      setTitle("");
      setAuthor("");
      setUrl("");
      setIsSending(true);
    });
  };

  const updateBlog = (id) => {
    const blog = blogs.find((b) => String(b.id) === String(id));
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    blogService.update(id, changedBlog).then((returnedBlog) => {
      dispatch(
        fetchBlog(blogs.map((blog) => (blog.id !== id ? blog : changedBlog)))
      );
    });
  };

  const removeBlog = (id) => {
    blogService.remove(id).then(() => dispatch(fetchBlog(blogs)));
  };

  const blogsDisplay = () => {
    const blogsCopy = [...blogs];

    return sort === "ascending"
      ? blogsCopy.sort((a, b) => a.likes - b.likes)
      : sort === "descending"
      ? blogsCopy.sort((a, b) => b.likes - a.likes)
      : blogs;
  };

  return (
    <Router>
      <div className="main">
        {user === null ? (
          <h2 style={{ textTransform: "uppercase" }}>log in to application</h2>
        ) : (
          <>
            <Navbar bg="light" data-bs-theme="light">
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Navbar.Brand>
                  <Link to="/">Navbar</Link>
                </Navbar.Brand>
                <Nav
                  className="me-auto"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <Link to="/">home</Link>
                  <Link to="/users">users</Link>
                </Nav>
              </div>
            </Navbar>
            <h2 style={{ textTransform: "capitalize" }}>blogs</h2>
          </>
        )}
        {notification.includes("wrong") ? (
          <Notification message={notification} variant="danger" />
        ) : (
          <Notification message={notification} variant="success" />
        )}
        {!user && <>{loginForm()}</>}
        {user && (
          <div className="mb-3">
            {user.name} logged in{" "}
            <Button
              variant="danger"
              onClick={handleLogout}
              className="logoutButton"
            >
              logout
            </Button>
          </div>
        )}
        <Routes>
          <Route path="/" element={blogView()} />
          <Route path="/users" element={<UsersView allUser={allUser} />} />
          <Route path="/users/:id" element={<UserView allUser={allUser} />} />
          <Route
            path="/blogs/:id"
            element={
              <BlogView
                user={user}
                blogs={blogs}
                updateBlog={updateBlog}
                handleIsSending={setIsSending}
                removeBlog={removeBlog}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
