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
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { withLocale } from "@/utils/helper";

const AppSidebar = () => {
  const { user } = useAuth();
  const userRole = user?.role;
  // const userCheck = user
  // console.log("ini user role : ", user);

  const t = useTranslations("Sidebar");
  const { locale } = useParams<{ locale: string }>();
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
                const localizeUrl = withLocale(locale, item.url);
                const isActive = pathname.startsWith(localizeUrl);
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
                      <Link href={localizeUrl} prefetch>
                        <item.icon />
                        <span>{t(item.title)}</span>
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
