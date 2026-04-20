export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  image?: string;
  isAdmin: boolean;
  roles: string[];
}

export interface LoginResponse {
  token: string;
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  roles: string[];
  image?: string;
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
  updateUserImage: (image: string) => void;
  logout: () => void;
}
