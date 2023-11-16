const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { kebabCase } = require("lodash");

const api = supertest(app);

const initialBlogs = [
  {
    title: "DIY Home Decor: Transforming Spaces with Creativity",
    author: "Olivia Anderson",
    url: "https://exampleblog.com/diy-home-decor",
    likes: 120,
  },
  {
    title: "The Science Behind Dreams: Decoding the Nightly Odyssey",
    author: "Dr. Michael Reed",
    url: "https://exampleblog.com/science-of-dreams",
    likes: 200,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test('blogs have unique identifier of "id"', async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  blogs.forEach((blog) => expect(blog["id"]).toBeDefined());
});

test("HTTP POST request creates new blog post", async () => {
  const newBlog = {
    title: "Investing in Cryptocurrency: Navigating the Volatile Market",
    author: "Gabriel White",
    url: "https://exampleblog.com/cryptocurrency-investing",
    likes: 280,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogs = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(blogs).toContain(
    "Investing in Cryptocurrency: Navigating the Volatile Market"
  );
});

test('blogs have "likes" property', async () => {
  const newBlog = {
    title: "Investing in Cryptocurrency: Navigating the Volatile Market",
    author: "Gabriel White",
    url: "https://exampleblog.com/cryptocurrency-investing",
  };

  await api.post("/api/blogs").send(newBlog);

  const response = await api.get("/api/blogs");
  const blogs = response.body;

  blogs.forEach((blog) => expect(blog["likes"]).toBeDefined());
});

test('blogs have "title" and "url" property', async () => {
  const newBlog = {
    author: "Gabriel White",
    likes: 280,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("blog returns status of 204 when deleted", async () => {
  const blogsAtStart = await api.get("/api/blogs");
  const blogToDelete = blogsAtStart.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await api.get("/api/blogs");
  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1);

  const titles = blogsAtEnd.body.map((r) => r.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test(`blog's "id" property succesfully updated`, async () => {
  const newBlog = {
    title: "DIY Home Decor: Transforming Spaces with Creativity",
    author: "Olivia Anderson",
    url: "https://exampleblog.com/diy-home-decor",
    likes: 1275,
  };

  const blogsAtStart = await api.get("/api/blogs");
  const blogToUpdate = blogsAtStart.body[0];

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(204);

  const blogsAtEnd = await api.get("/api/blogs");
  const likes = blogsAtEnd.body.map((r) => r.likes);
  expect(likes).toContain(1275);
});

afterAll(async () => {
  await mongoose.connection.close();
});
