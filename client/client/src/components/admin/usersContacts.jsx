import { useEffect, useState } from "react";
import { getAllContacts } from "../../services/contactService";
import { Link } from "react-router-dom";
const UserContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllContacts();
      setContacts(response.data);
    };
    getUsers();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {contacts.length ? (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>email</th>
                <th>message</th>
                <th>Date</th>
                <th>options</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => {
                return (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>{contact.createdAt}</td>
                    <td>
                      <Link
                        className="p-2"
                        to={`/usersContacts/contact/${contact._id}`}
                      >
                        <i className="bi bi-book-fill text-primary"></i>
                      </Link>
                      <Link to={`/usersContacts/delete/${contact._id}`}>
                        <i className="bi bi-trash-fill text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5 text-center bg-warning p-4 col-lg-3 col-md-4 col-sm-6">
          No contacts
        </div>
      )}
    </div>
  );
};

export default UserContacts;
