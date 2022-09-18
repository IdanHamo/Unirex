import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminCrud";
import crudService from "../../services/crudService";
const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    getUsers();
  }, []);

  const handleTogglePremium = async (user) => {
    user.premium = !user.premium;
    await crudService.togglePremium(user);

    const index = users.findIndex((u) => u._id === user._id);
    const newUsersArr = [...users];
    newUsersArr[index] = user;

    setUsers(newUsersArr);
  };
  return (
    <div className="d-flex justify-content-center">
      {users ? (
        <div>
          <table className="table-users table-striped">
            <thead>
              <tr>
                <th>user name</th>
                <th>email</th>
                <th>is premium</th>
                <th>number of favorites</th>
                <th>created at</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.premium ? (
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={() => {
                              handleTogglePremium(user);
                              // console.log(checked);
                            }}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => {
                              handleTogglePremium(user);
                              // console.log(checked);
                            }}
                          />
                        )}
                      </td>
                      <td>{user.favorites.length}</td>
                      <td>{user.createdAt}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5 text-center bg-warning p-4 col-lg-3 col-md-4 col-sm-6">
          No Users
        </div>
      )}
    </div>
  );
};

export default Admin;
