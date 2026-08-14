import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  categories: `${API_BASE_URL}/categories`,
  recipes: `${API_BASE_URL}/recipes`,
};

export const AUTH_TOKEN_KEY = 'recipehub_token';
