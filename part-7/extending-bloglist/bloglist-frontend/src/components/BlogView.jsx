import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { Button, Form, ListGroup } from "react-bootstrap";

const BlogView = ({ user, blogs, updateBlog, handleIsSending, removeBlog }) => {
  const [comment, setComments] = useState("");
  const dispatch = useDispatch();

  const id = useParams().id;
  const blog = blogs.find((b) => String(b.id) === String(id));
  const navigate = useNavigate();

  return (
    <>
      <h2>{blog.title}</h2>
      <a href="#">{blog.url}</a>
      <div className="mt-3">
        {blog.likes} likes{" "}
        <Button
          variant="primary"
          className="likeButton"
          onClick={() => {
            updateBlog(blog.id);
            handleIsSending(true);
          }}
        >
          like
        </Button>{" "}
        {user?.name === blog?.user?.name && (
          <Button
            variant="danger"
            className="removeButton"
            onClick={() => {
              if (window.confirm(`Remove blog ${blog.title} ${blog.author}`)) {
                removeBlog(blog.id);
                handleIsSending(true);
                navigate("/");
              }
            }}
          >
            remove
          </Button>
        )}
      </div>
      <div>added by {blog.user.username}</div>

      <h2>comments</h2>
      <Form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          const content = {
            comments: comment,
          };

          blogService.createComment(id, content).then((returnedBlog) => {
            dispatch(fetchBlog(blogs));
          });
          setComments("");
          handleIsSending(true);
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Add a Comment</Form.Label>
          <Form.Control
            id="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComments(target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          add comment
        </Button>
      </Form>
      <ListGroup>
        {blog.comments.map((comment, i) => {
          return <ListGroup.Item key={i}>{comment}</ListGroup.Item>;
        })}
      </ListGroup>
    </>
  );
};

export default BlogView;
