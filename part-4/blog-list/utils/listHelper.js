const _ = require("lodash");

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

const mostBlogs = (blogs) => {
  const blogGroups = _.groupBy(blogs, "author");
  const topAuthorGroup = _.maxBy(
    _.toPairs(blogGroups),
    ([, group]) => group.length
  );
  const [topAuthor, topAuthorBlogs] = topAuthorGroup;

  return {
    author: topAuthor,
    blogs: topAuthorBlogs.length,
  };
};

const mostLikes = (blogs) => {
  const blogGroups = _.groupBy(blogs, "author");
  const likesByAuthor = _.mapValues(blogGroups, (blogs) =>
    _.sumBy(blogs, "likes")
  );
  const topAuthorGroup = _.maxBy(
    _.toPairs(likesByAuthor),
    ([, likes]) => likes
  );
  const [topAuthorName, topAuthorLikes] = topAuthorGroup;

  return {
    author: topAuthorName,
    likes: topAuthorLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
