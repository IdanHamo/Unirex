import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import contactService from "../../services/contactService";

const FullContact = () => {
  const params = useParams();
  const [contact, setContact] = useState();

  useEffect(() => {
    const getContact = async function () {
      const { data } = await contactService.getContact(params.id);
      setContact(data);
    };
    getContact();
  }, []);

  return (
    <div>
      {contact && (
        <div>
          <h1 className="mt-5">{contact.name}</h1>

          <div className="mt-5">
            <h3>email : {contact.email}</h3>
          </div>
          <div className=" my-5">message : {contact.message}</div>

          <div>
            <a className="text-primary p-4" href={"mailto:" + contact.email}>
              Send reply
            </a>
            <Link
              className="p-4 text-danger"
              to={`/usersContacts/delete/${contact._id}`}
            >
              Delete
            </Link>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default FullContact;
