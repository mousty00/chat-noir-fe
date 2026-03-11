"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/auth";

interface GoogleJwtPayload {
  sub: string;
  username: string;
  email: string;
  isAdmin: boolean;
  roles: string[];
}

export default function OAuth2CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken, setUser } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Authentication failed. No token received.");
      router.replace("/login");
      return;
    }

    try {
      const payload = jwtDecode<GoogleJwtPayload>(token);

      const user: User = {
        username: payload.username,
        email: payload.email,
        isAdmin: payload.isAdmin,
        roles: payload.roles,
      };

      setToken(token);
      setUser(user);

      toast.success("Welcome back to the archive.");
      router.replace("/");
    } catch {
      toast.error("Authentication failed. Invalid token.");
      router.replace("/login");
    }
  }, [searchParams, setToken, setUser, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
          Authenticating...
        </p>
      </div>
    </div>
  );
}
