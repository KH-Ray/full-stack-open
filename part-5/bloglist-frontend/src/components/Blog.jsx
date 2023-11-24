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
    <div style={blogStyle} className="blog">
      <div className="blogHeader">
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility} className="viewButton">
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible} className="blogDescription">
        <div>
          <a href="#">{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}{" "}
          <button
            className="likeButton"
            onClick={() => {
              updateBlog(blog.id);
              handleIsSending(true);
            }}
          >
            like
          </button>
        </div>
        <div>{blog?.user?.name}</div>
        {user?.name === blog?.user?.name && (
          <button
            className="removeButton"
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
