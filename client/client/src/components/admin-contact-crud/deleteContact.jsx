import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import contactService from "../../services/contactService";

const DeleteContact = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const deleteContact = async function () {
      await contactService.deleteContact(params.id);
      toast("Contact details deleted successfully.");
      navigate("/usersContacts");
    };
    deleteContact();
  }, []);
  return null;
};

export default DeleteContact;
