// base.ts code:
import routes from '../routes';
import { getAuthToken, removeAuthUser, } from '../utils/authStorage';

export const API_BASEURL = `http://localhost:5000`;

export type ResponseModel<T> = {
  isSuccessful: false;
  errors: string[];
  hasError?: true;
} | {
  isSuccessful: true;
  data: T;
  totalRowCount?: number;
}

export async function authenticatedFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  
  const headers: Record<string, string>= {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASEURL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: headers,
  });

  // Optional: Global handling for 401 Unauthorized/Forbidden
  if (response.status === 401) {
    console.warn("Authentication failed (401). Token expired. Logging out...");
    removeAuthUser();
    window.location.href = routes.signIn.route();
  }

  return response;
}