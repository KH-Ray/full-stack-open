const BlogForm = (props) => {
  return (
    <>
      <h2>create new</h2>

      <form onSubmit={props.addBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
            placeholder="title"
            id="title"
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={props.author}
            onChange={({ target }) => props.setAuthor(target.value)}
            placeholder="author"
            id="author"
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={props.url}
            onChange={({ target }) => props.setUrl(target.value)}
            placeholder="url"
            id="url"
          />
        </div>

        <button type="submit" id="create">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
