"use client";
import api from "@/lib/axios";
import { createClient } from "@/lib/supabase/client";
import { User } from "@/types/user";
import axios, { Axios, AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const getSession = useCallback(async () => {
    setLoading(true);
    setError(null);

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Failed to get user : ", error);
      setError(error.message);
      setUser(null);
      return;
    }

    if (session?.user) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setUser({
        id: session.user.id,
        email: session.user.email ?? "",
        name: data.name,
        role: data.role,
      });
    } else {
      setUser(null);
    }

    // setUser(data)
    console.log("data di auth provider : ", session?.user);
    setLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
          return;
        }

        if (data?.user) {
          console.log("user login auth provider : ", data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Login error: ", err);
        setError("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await api.post("/logout");
      setUser(null);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Failed to logout properly.");
      } else {
        setError("Logout failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(
    async (email: string) => {
      try {
        setLoading(true);
        setError(null);
      } catch (err) {
        console.error("Password reset error: ", err);
        setError("Password reset failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  useEffect(() => {
    getSession();
  }, [getSession, supabase]);

  // refreshUser,
  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, error, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
