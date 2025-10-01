// Define the key used in localStorage

import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../constants/KEY_NAMES';
import type { UserDto } from '../contracts/UserDto';

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Error reading token from localStorage:", error);
    return null;
  }
}

export function setAuthUser(user: UserDto): void {
  try {
    // 1. Save the token separately (still useful for fetch wrapper)
    localStorage.setItem(AUTH_TOKEN_KEY, user.token);
    
    // 2. Save the rest of the user object (excluding the token, if you wish, 
    // but saving the whole object is simplest)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user data to localStorage:", error);
  }
}

export function getAuthUser(): UserDto | null {
  try {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    return storedUser ? JSON.parse(storedUser) as UserDto : null;
  } catch (error) {
    console.error("Error reading user data from localStorage:", error);
    return null;
  }
}

export function removeAuthUser(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.error("Error removing user data from localStorage:", error);
  }
}