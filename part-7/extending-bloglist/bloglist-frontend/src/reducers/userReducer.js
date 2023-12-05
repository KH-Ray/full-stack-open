const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;

    case "LOGOUT":
      return action.payload;

    default:
      return state;
  }
};

export const setUser = (content) => {
  return {
    type: "SET_USER",
    payload: { ...content },
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT",
    payload: null,
  };
};

export default userReducer;
