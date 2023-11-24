import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;

  const updateHandlers = jest.fn();
  const sendingHandlers = jest.fn();

  const blog = {
    title: "Exploring Ancient History",
    author: "Olivia Parker",
    url: "https://ancienthistoryblog.com/exploring-history",
  };

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updateBlog={updateHandlers}
        handleIsSending={sendingHandlers}
      />
    ).container;
  });

  test("blog renders blog's title and author initially", () => {
    const blogHeader = container.querySelector(".blogHeader");
    const blogDescription = container.querySelector(".blogDescription");
    expect(blogHeader).toHaveTextContent(
      "Exploring Ancient History Olivia Parker"
    );
    expect(blogDescription).toHaveStyle("display: none");
  });

  test("blog's URL and likes renders when button is clicked", async () => {
    const blogHeader = container.querySelector(".blogHeader");
    const blogDescription = container.querySelector(".blogDescription");

    const user = userEvent.setup();
    const button = blogHeader.querySelector("button");

    await user.click(button);

    expect(blogDescription).not.toHaveStyle("display: none");
  });

  test("ensures blog's like button are called accordingly when clicked", async () => {
    const user = userEvent.setup();

    const blogDescription = container.querySelector(".blogDescription");
    const button = blogDescription.querySelector("button");

    await user.click(button);
    await user.click(button);

    console.log(updateHandlers.mock.calls);

    expect(updateHandlers.mock.calls).toHaveLength(2);
  });
});
