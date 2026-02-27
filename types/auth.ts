export interface User {
  username: string;
  email: string;
  name?: string;
  image?: string;
  isAdmin: boolean;
  roles: string[];
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  isAdmin: boolean;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}
