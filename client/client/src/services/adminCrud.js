import httpService from "./httpService";

export async function getAllUsers() {
  return httpService.get("/users/getAll");
}

const adminCrud = {
  getAllUsers,
};

export default adminCrud;
