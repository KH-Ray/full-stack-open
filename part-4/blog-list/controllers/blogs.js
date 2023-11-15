const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  if (!blog?.likes) {
    blog["likes"] = 0;
  }

  if (!blog?.title || !blog?.url) {
    blog.save().then((result) => {
      response.status(400).json(result);
    });
  } else {
    blog.save().then((result) => {
      response.status(201).json(result);
    });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatesBlog) => response.status(204).json(updatesBlog))
    .catch((error) => next(error));
});

module.exports = blogsRouter;
