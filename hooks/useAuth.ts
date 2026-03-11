import { useCallback } from "react";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { LOGIN, REGISTER } from "@/graphql/auth";
import { LoginResponse, User } from "@/types/auth";
import { ApiResponse } from "@/types/cat";
import { API_URL } from "@/constants/api";

export const useAuth = () => {
  const { setUser, setToken, setLoading, setError, logout: clearStore, isLoading } = useAuthStore();
  const router = useRouter();

  const [loginMutation] = useMutation<{ login: ApiResponse<LoginResponse> }>(LOGIN);
  const [registerMutation] = useMutation<{ register: ApiResponse<string> }>(REGISTER);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data: mutationData } = await loginMutation({
        variables: {
          request: { username, password }
        }
      });

      const result = mutationData?.login;

      if (!result?.success || !result.data) {
        throw new Error(result?.message || "Failed to login");
      }

      const data = result.data;
      
      const user: User = {
        username: data.username,
        email: data.email,
        isAdmin: data.isAdmin,
        roles: data.roles,
      };

      setToken(data.token);
      setUser(user);
      
      toast.success("Welcome back to the archive.");
      router.push("/");
      return true;
    } catch (err: any) {
      const msg = err.message || "Login failed";
      setError(msg);
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loginMutation, setLoading, setError, setToken, setUser, router]);

  const register = useCallback(async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data: mutationData } = await registerMutation({
        variables: {
          request: { username, email, password }
        }
      });

      const result = mutationData?.register;

      if (!result?.success) {
        throw new Error(result?.message || "Failed to register");
      }

      toast.success("Account registered. Please proceed to login.");
      router.push("/login");
      return true;
    } catch (err: any) {
      const msg = err.message || "Registration failed";
      setError(msg);
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [registerMutation, setLoading, setError, router]);

  const loginWithGoogle = useCallback(() => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  }, []);

  const logout = useCallback(() => {
    clearStore();
    toast.info("Logged out from the archive.");
    router.push("/login");
  }, [clearStore, router]);

  return {
    login,
    register,
    loginWithGoogle,
    logout,
    isLoading
  };
};
