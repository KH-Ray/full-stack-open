import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, user, handleIsSending, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div className="blog">
      <div className="blogHeader">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
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
