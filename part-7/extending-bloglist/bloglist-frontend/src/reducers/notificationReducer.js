const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.payload;

    default:
      return state;
  }
};

export const notificate = (content) => {
  return {
    type: "NOTIFY",
    payload: content,
  };
};

export default notificationReducer;
