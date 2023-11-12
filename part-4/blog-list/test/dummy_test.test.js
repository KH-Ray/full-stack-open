const listHelper = require("../utils/listHelper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("blog with largest likes", () => {
  const listWithManyBlog = [
    {
      title: "The Power of Storytelling: Connecting Through Narratives",
      author: "Sophie Turner",
      url: "https://exampleblog.com/power-of-storytelling",
      likes: 91,
    },
    {
      title: "Tech Trends 2023: Navigating the Digital Frontier",
      author: "Andrew Carter",
      url: "https://exampleblog.com/tech-trends-2023",
      likes: 184,
    },
    {
      title: "Fitness and Wellness: A Holistic Approach to Healthy Living",
      author: "Melissa Rodriguez",
      url: "https://exampleblog.com/fitness-and-wellness",
      likes: 159,
    },
  ];

  test("finds out which blog has the most likes", () => {
    const result = listHelper.favoriteBlog(listWithManyBlog);
    expect(result).toEqual({
      title: "Tech Trends 2023: Navigating the Digital Frontier",
      author: "Andrew Carter",
      likes: 184,
    });
  });
});
