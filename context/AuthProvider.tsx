"use client";
import api from "@/lib/axios";
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
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/user");
      setUser(data);
      console.log("response fetch user : ", data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setUser(null);
        } else {
          setError(
            err.response?.data?.message || "Failed to fetch user information"
          );
        }
      } else {
        setError("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/auth/login", { email, password });
      await refreshUser();
      // return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Invalid email or password");
      } else {
        setError("Loading failed. Please try again.");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

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

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser, error }}
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
