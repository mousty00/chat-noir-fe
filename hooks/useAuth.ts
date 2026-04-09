import { useCallback } from "react";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { LOGIN, REGISTER } from "@/graphql/auth";
import { LoginResponse, User } from "@/types/auth";
import { ApiResponse } from "@/types/cat";
import { API_URL } from "@/constants/api";

interface AuthError extends Error {
  status?: number;
}

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
        const err = new Error(result?.message || "Failed to login") as AuthError;
        err.status = result?.status;
        throw err;
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
      return { success: true };
    } catch (err: unknown) {
      const authErr = err as AuthError;
      const msg = authErr.message || "Login failed";
      setError(msg);
      toast.error(msg);
      return { success: false, status: authErr.status };
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

      toast.success(result.message || "Account registered. Please check your email to verify your account.");
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [registerMutation, setLoading, setError]);

  const resendVerificationEmail = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to resend verification email");
      toast.success(json.message || "Verification email sent.");
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resend verification email";
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const loginWithGoogle = useCallback(() => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  }, []);

  const logout = useCallback(() => {
    clearStore();
    toast.info("Logged out from the archive.");
    router.push("/login");
  }, [clearStore, router]);

  const deleteAccount = useCallback(async () => {
    setLoading(true);
    try {
      const { token } = useAuthStore.getState();
      const res = await fetch(`${API_URL}/users/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to delete account");
      clearStore();
      toast.success("Your account has been permanently deleted.");
      router.push("/login");
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete account";
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [clearStore, router, setLoading]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    try {
      const { token } = useAuthStore.getState();
      const res = await fetch(`${API_URL}/users/me/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to change password");
      toast.success("Password changed successfully.");
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to change password";
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const forgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      toast.success(json.message || "If an account with that email exists, a reset link has been sent.");
      return true;
    } catch {
      toast.error("Something went wrong. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to reset password");
      toast.success("Password reset successfully. You can now log in.");
      router.push("/login");
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to reset password";
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setLoading, router]);

  return {
    login,
    register,
    loginWithGoogle,
    logout,
    deleteAccount,
    changePassword,
    forgotPassword,
    resetPassword,
    resendVerificationEmail,
    isLoading
  };
};
