import httpService from "./httpService";
import { getJWT } from "./userService";

export function receiveToken() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createRecipe(details) {
  receiveToken();
  return httpService.post("/cards/createRecipe", details);
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

const recipesService = {
  createRecipe,
  getAll,
  deleteRecipe,
  viewRecipe,
  editRecipe,
  getById,
  getAllRecipes,
  receiveToken,
};

export default recipesService;
