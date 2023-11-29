import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const notifyValue = useNotificationValue();

  if (!notifyValue) return;

  if (notifyValue === "error") {
    return (
      <div style={style}>too short anecdote, must have length 5 or more</div>
    );
  }

  return (
    notifyValue && (
      <div style={style}>anecdote &apos;{notifyValue}&apos; voted</div>
    )
  );
};

export default Notification;
