import httpService from "./httpService";

export async function sendContact(contactDetails) {
  return await httpService.post("/contact", contactDetails);
}

export async function getAllContacts() {
  return await httpService.get("/contact/getAll");
}
export async function getContact(id) {
  return await httpService.get(`/contact/getContact/${id}`);
}
export async function deleteContact(id) {
  return await httpService.get(`/contact/deleteContact/${id}`);
}

const contactService = {
  sendContact,
  getAllContacts,
  getContact,
  deleteContact,
};

export default contactService;
