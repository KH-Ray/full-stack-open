const Notification = ({ notify }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notify) return;

  if (notify === "error") {
    return (
      <div style={style}>too short anecdote, must have length 5 or more</div>
    );
  }

  return notify && <div style={style}>anecdote &apos;{notify}&apos; voted</div>;
};

export default Notification;
