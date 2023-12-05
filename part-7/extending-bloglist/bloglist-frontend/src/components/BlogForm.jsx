import { Button, Form } from "react-bootstrap";

const BlogForm = (props) => {
  return (
    <>
      <h2>create new</h2>

      <Form onSubmit={props.addBlog}>
        <Form.Group className="mb-3">
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
            placeholder="title"
            id="title"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            value={props.author}
            onChange={({ target }) => props.setAuthor(target.value)}
            placeholder="author"
            id="author"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            value={props.url}
            onChange={({ target }) => props.setUrl(target.value)}
            placeholder="url"
            id="url"
          />
        </Form.Group>

        <Button
          variant="primary"
          className="mb-3"
          style={{ width: "100%" }}
          type="submit"
          id="create"
        >
          Create
        </Button>
      </Form>
    </>
  );
};

export default BlogForm;
