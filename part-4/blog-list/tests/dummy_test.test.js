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

describe("author with the largest amount of blogs", () => {
  const listWithManyBlog = [
    {
      title: "Tech Trends 2023: Navigating the Digital Frontier",
      author: "Andrew Carter",
      url: "https://exampleblog.com/tech-trends-2023",
      likes: 180,
    },
    {
      title: "The Power of Storytelling: Connecting Through Narratives",
      author: "Andrew Carter",
      url: "https://exampleblog.com/power-of-storytelling",
      likes: 120,
    },
    {
      title: "Sustainable Living: A Guide to Eco-Friendly Practices",
      author: "Andrew Carter",
      url: "https://exampleblog.com/sustainable-living",
      likes: 250,
    },
    {
      title: "Mindfulness Meditation: Finding Inner Peace in a Busy World",
      author: "Olivia Anderson",
      url: "https://exampleblog.com/mindfulness-meditation",
      likes: 90,
    },
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

  test("find the author who has the largest amount of blogs", () => {
    const result = listHelper.mostBlogs(listWithManyBlog);
    expect(result).toEqual({
      author: "Andrew Carter",
      blogs: 3,
    });
  });
});

describe("author with the largest amount of likes", () => {
  const listWithManyBlog = [
    {
      title: "Tech Trends 2023: Navigating the Digital Frontier",
      author: "Andrew Carter",
      url: "https://exampleblog.com/tech-trends-2023",
      likes: 180,
    },
    {
      title: "The Power of Storytelling: Connecting Through Narratives",
      author: "Andrew Carter",
      url: "https://exampleblog.com/power-of-storytelling",
      likes: 120,
    },
    {
      title: "Sustainable Living: A Guide to Eco-Friendly Practices",
      author: "Andrew Carter",
      url: "https://exampleblog.com/sustainable-living",
      likes: 250,
    },
    {
      title: "Mindfulness Meditation: Finding Inner Peace in a Busy World",
      author: "Olivia Anderson",
      url: "https://exampleblog.com/mindfulness-meditation",
      likes: 90,
    },
    {
      title: "DIY Home Decor: Transforming Spaces with Creativity",
      author: "Olivia Anderson",
      url: "https://exampleblog.com/diy-home-decor",
      likes: 120,
    },
    {
      title: "The Science Behind Dreams: Decoding the Nightly Odyssey",
      author: "Olivia Anderson",
      url: "https://exampleblog.com/science-of-dreams",
      likes: 500,
    },
  ];

  test("find the author who has the largest amount of likes", () => {
    const result = listHelper.mostLikes(listWithManyBlog);
    expect(result).toEqual({
      author: "Olivia Anderson",
      likes: 710,
    });
  });
});
