import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;

    default:
      return null;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notify, notifyDispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[notify, notifyDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export default NotificationContext;
