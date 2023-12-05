require("dotenv").config();
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.post("/", middleware.userExatractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!body?.likes) {
    body["likes"] = 0;
  }

  if (!body?.comments) {
    body["comments"] = [];
  }

  if (!body?.title || !body?.url) {
    response.status(400).end();
  }

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user.id,
    likes: body.likes,
    comments: body.comments,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.post("/:id/comments", (request, response) => {
  const body = request.body;
  Blog.findById(request.params.id).then((blog) => {
    blog.comments.push(body.comments);
    blog.save();
    response.status(201).json(blog);
  });
});

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.delete(
  "/:id",
  middleware.userExatractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      return response.status(204).end();
    } else {
      return response.status(401).json({ error: "token invalid" });
    }
  }
);

blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const blog = {
    user: body.user,
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url,
    comments: body.comments,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatesBlog) => response.status(204).json(updatesBlog))
    .catch((error) => next(error));
});

module.exports = blogsRouter;
