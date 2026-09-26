// Centralized API configuration supporting local development and deployed production environments
const rawApiUrl = import.meta.env.VITE_API_URL || '';

// Clean up any accidental trailing slashes
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

export function buildApiUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}
