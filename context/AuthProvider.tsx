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
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (userError) {
        console.error("Failed to fetch public.users record.", userError);
        setError(userError.message);
        return;
      }

      if (userData) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          name: userData.name ?? "",
          role: userData.role ?? "",
        });
        console.log("data di session  : ", userData);
      }
    } else {
      setUser(null);
    }

    // setUser(data)
    console.log("data di session function : ", session?.user);
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
          console.log("user di login function  : ", data);
          await getSession();
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
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError("Logout failed. Please try again.");
      console.error("Unexpected logout error: ", err);
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
