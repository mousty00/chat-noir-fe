export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_PATH = "/api";
export const API_URL = `${API_BASE_URL}${API_PATH}`;
export const API_GRAPHQL_URL = `${API_URL}/graphql`;

export const ENDPOINTS = {
  cats: "/cats",
  users: "/users",
  auth: "/auth",
} as const;

export const getEndpoint = (endpoint: keyof typeof ENDPOINTS) => {
  return `${API_URL}${ENDPOINTS[endpoint]}`;
};
