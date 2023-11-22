const Notification = ({ message, color }) => {
  if (!message) return;

  return (
    <div className="notification" style={{ color: color }}>
      {message}
    </div>
  );
};

export default Notification;
