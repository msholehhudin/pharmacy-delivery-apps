"use client";
import api from "@/lib/axios";
import { supabase } from "@/lib/supabase/client";
import { User } from "@/types/user";
import axios, { Axios, AxiosError } from "axios";
import { useRouter } from "next/navigation";
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
  loadingLogout: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingLogout, setLogoutLoading] = useState(false);

  const router = useRouter();

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
          phone: userData.phone ?? "",
          status: userData.avatar ?? "",
        });
        console.log("data di session  : ", userData);
      }
    } else {
      setUser(null);
    }
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
    [getSession]
  );

  const logout = useCallback(async () => {
    setLogoutLoading(true);
    try {
      await supabase.auth.signOut();
      await new Promise((res) => setTimeout(res, 1000));
      // setUser(null);
      router.refresh();
    } catch (err) {
      setError("Logout failed. Please try again.");
      console.error("Unexpected logout error: ", err);
    } finally {
      setLogoutLoading(false);
    }
  }, [router]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true);
      setError(null);
    } catch (err) {
      console.error("Password reset error: ", err);
      setError("Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSession();
  }, [getSession]);

  // refreshUser,
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        error,
        resetPassword,
        loadingLogout,
      }}
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
