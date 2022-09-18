import httpService from "./httpService";
import { getJWT } from "./userService";

export function receiveToken() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createRecipe(details) {
  receiveToken();
  return httpService.post("/cards/createRecipe", details);
}
export function addImage(details, id) {
  receiveToken();
  return httpService.put(`/createRecipe/image/${id}`, details);
}

export async function deleteRecipe(id) {
  receiveToken();
  return httpService.delete(`/cards/${id}`);
}

export async function viewRecipe(id) {
  receiveToken();
  return httpService.get(`/cards/fullRecipe/${id}`);
}

export async function editRecipe(id, body) {
  receiveToken();
  return httpService.put(`/cards/editRecipe/${id}`, body);
}

export function getAll() {
  receiveToken();
  return httpService.get("/cards/my-cards");
}

export function getById(id) {
  receiveToken();
  return httpService.get(`/cards/my-card/${id}`);
}
export function getAllRecipes(searchResult) {
  receiveToken();
  return httpService.get(`/cards/allCards/${searchResult}`);
}
export function getFullUser(id) {
  receiveToken();
  return httpService.get(`/users/me/${id}`);
}
export function getUserById(user) {
  receiveToken();
  return httpService.post(`/users/user`, user);
}
// export function changeImage(user) {
//   receiveToken();
//   return httpService.put(`/users/user`, user);
// }
export function togglePremium(user) {
  receiveToken();
  return httpService.put(`/users/premium/`, user);
}

export function getAllCards() {
  return httpService.get("/cards/getAllCards");
}

const crudService = {
  createRecipe,
  addImage,
  getAll,
  deleteRecipe,
  viewRecipe,
  editRecipe,
  getById,
  getAllRecipes,
  receiveToken,
  getFullUser,
  getUserById,
  getAllCards,
  togglePremium,
};

export default crudService;
