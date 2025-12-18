"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { menuItems } from "@/data";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { Hospital } from "lucide-react";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const { user } = useAuth();
  const userRole = user?.role;
  console.log("ini user role : ", userRole);
  const pathname = usePathname();

  if (!userRole) return null;
  const items = menuItems[userRole];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                {/* <Image src={"/logo.svg"} width={20} height={20} alt="logo" /> */}
                <Hospital />
                <span>MediXpress</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="m-0" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: any) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${
                        isActive
                          ? "bg-primary/90 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                          : "hover:bg-muted"
                      } transition-colors`}
                    >
                      <Link href={item.url} prefetch>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
