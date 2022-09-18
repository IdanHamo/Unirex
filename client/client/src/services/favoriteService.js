import httpService from "./httpService";
import { receiveToken } from "./crudService";

export function toggleFavorite(id) {
  return httpService.post(`/favorites/favorites/${id}`);
}
export function toggleAPIFavorite(id, recipe) {
  return httpService.post(`/favorites/api/favorites`, recipe);
}

export async function getFavoritesAsync() {
  receiveToken();
  return httpService.get(`/favorites/favorites`);
}

const favoriteService = {
  toggleFavorite,
  toggleAPIFavorite,
  getFavoritesAsync,
};

export default favoriteService;
