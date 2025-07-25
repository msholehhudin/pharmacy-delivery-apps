"use client";
import AuthRedirect from "@/components/AuthRedirect";
import { useAuth } from "@/context/AuthProvider";
import React from "react";
import UserManagement from "./users";

const Users = () => {
  return (
    <>
      <UserManagement />
    </>
  );
};

export default Users;
