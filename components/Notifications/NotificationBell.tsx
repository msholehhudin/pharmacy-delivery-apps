"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell, Check, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useNotifications } from "@/hooks/Notifications/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
    isError,
    error,
    markAsRead,
    isMarkingAsRead,
  } = useNotifications();

  console.log("notification : ", notifications);

  const handleNotificationClick = async (
    notificationId: string,
    isRead: boolean
  ) => {
    // console.log("Notif clicked : ", !isRead);
    if (!isRead) {
      console.log("Notif clicked inside  if : ", isRead);
      try {
        const result = await markAsRead(notificationId);
        console.log("Notif clicked response : ", result);
      } catch (error) {
        console.error("Failed to mark notification as read", error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="cursor-pointer relative"
          // aria-label={`Notifications ${
          //   notificationCount > 0 ? ` (${notificationCount} unread)` : ""
          // }`}
        >
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="flex items-center justify-between p-4 border-b gap-3">
          <h3 className="font-semibold">Notifications</h3>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="cursor-pointer bg-blue-400/20 "
          >
            <Check className="h-4 w-4 mr-1" />
            Mark all read
          </Button>
        </div>
        <ScrollArea className="max-h-96 min-h-24">
          {/* <div className="p-4 text-center">No Notifications</div> */}
          {isLoading ? (
            <div className="p-8  text-center flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Loading Notifications...
              </p>
            </div>
          ) : isError ? (
            <div className="p-8 text-center">
              <p className="text-sm text-destructive">
                Failed to load notifications
              </p>
              <p className="text-xs text-muted-foregroundmt-1">
                {error?.message || "Please try again later"}
              </p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">No Notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() =>
                    handleNotificationClick(
                      notification.id,
                      notification.is_read
                    )
                  }
                  className={cn(
                    "p-4 hover:bg-accent dark:hover:bg-white/10 cursor-pointer transition-colors",
                    !notification.is_read && "bg-blue-50/50 dark:bg-blue-950/20"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {!notification.is_read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">
                        {notification.title}
                      </p>
                      {notification.message && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(
                          new Date(notification.created_at),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
