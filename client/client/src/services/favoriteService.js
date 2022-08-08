import httpService from "./httpService";
import {receiveToken} from "./recipesService";

export function toggleFavorite(id) {
  return httpService.post(`/favorites/favorites/${id}`);
}

export async function getFavoritesAsync() {
  receiveToken();
  return httpService.get(`/favorites/favorites`);
}

const favoriteService = {
  toggleFavorite,
  getFavoritesAsync,
};

export default favoriteService;
