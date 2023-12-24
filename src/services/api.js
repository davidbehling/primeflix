import axios from 'axios';

export const KEY = 'c4c72bdb9c9ff5800bf6103504ca17a7';

export const LANGUAGE = 'pt-BR';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});

export default api;