let _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs
    .map((blog) => blog.likes)
    .reduce((acc, curVal) => acc + curVal, 0);
};

const favoriteBlog = (blogs) => {
  let largest = blogs[0];

  for (const blog of blogs) {
    if (blog.likes > largest.likes) {
      largest = blog;
    }
  }

  return {
    title: largest.title,
    author: largest.author,
    likes: largest.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
