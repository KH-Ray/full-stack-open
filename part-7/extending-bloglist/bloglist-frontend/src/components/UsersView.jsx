import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UsersView = ({ allUser }) => {
  return (
    <>
      <h2>Users</h2>

      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Users</th>
            <th>blogs created</th>
          </tr>
        </tbody>
        {allUser.map((user) => {
          return (
            <tbody key={user.id}>
              <tr>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </>
  );
};

export default UsersView;
