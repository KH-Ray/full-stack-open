import { useState } from "react";

const Blog = ({ blog, user, handleIsSending, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <a href="#">{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}{" "}
          <button
            onClick={() => {
              updateBlog(blog.id);
              handleIsSending(true);
            }}
          >
            like
          </button>
        </div>
        <div>{blog.author}</div>
        {user?.name === blog?.user?.name && (
          <button
            onClick={() => {
              if (window.confirm(`Remove blog ${blog.title} ${blog.author}`)) {
                removeBlog(blog.id);
                handleIsSending(true);
              }
            }}
          >
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
