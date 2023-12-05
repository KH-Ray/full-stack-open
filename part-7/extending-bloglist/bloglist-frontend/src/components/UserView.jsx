import { useParams } from "react-router-dom";

const UserView = ({ allUser }) => {
  const id = useParams().id;
  const user = allUser.find((u) => String(u.id) === String(id));

  if (!user) return null;

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog, i) => {
          return <li key={i}>{blog.title}</li>;
        })}
      </ul>
    </>
  );
};

export default UserView;
