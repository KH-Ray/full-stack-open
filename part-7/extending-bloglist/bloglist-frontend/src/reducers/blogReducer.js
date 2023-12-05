const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH":
      return action.payload;

    case "APPEND":
      return [...state, action.payload];

    default:
      return state;
  }
};

export const fetchBlog = (content) => {
  return {
    type: "FETCH",
    payload: content,
  };
};

export const appendBlog = (content) => {
  return {
    type: "APPEND",
    payload: { ...content },
  };
};

export default blogReducer;
