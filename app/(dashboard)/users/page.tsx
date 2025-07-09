"use client";
import AuthRedirect from "@/components/AuthRedirect";
import { useAuth } from "@/context/AuthProvider";
import React from "react";

const Users = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <AuthRedirect>Halaman User 1</AuthRedirect>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Users;
