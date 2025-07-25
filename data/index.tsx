import { Transaction } from "@/types/transactions";
import { UserRole } from "@/types/user";
import {
  ArrowRightLeft,
  BarChart2,
  Home,
  Settings,
  Truck,
  User,
  LucideIcon,
} from "lucide-react";

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const menuItems: Record<UserRole, MenuItem[]> = {
  pharmacy_super_admin: [
    {
      title: "Dashboard",
      url: "/home",
      icon: Home,
    },
    {
      title: "Transaction",
      url: "/transactions",
      icon: ArrowRightLeft,
    },
    {
      title: "User Management",
      url: "/users",
      icon: User,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart2,
    },
    {
      title: "System Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  pharmacy_staff: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Transaction",
      url: "/transactions",
      icon: ArrowRightLeft,
    },
  ],
  courier: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Transaction",
      url: "/delivery",
      icon: ArrowRightLeft,
    },
  ],
};

export const transactions: Transaction[] = [
  {
    id: 1,
    recipient_name: "sholeh",
    recipient_address: "jakarta",
    recipient_phone: 628121234,
    medicine_items: [
      { name: "Pracetamol", qty: 2 },
      { name: "Amoxicilin", qty: 1, note: "Pagi & Malam" },
    ],
    delivery_date: "26 June 2025",
    courier_id: 1,
    status: "pending",
    payment_status: "unpaid",
    delivery_fee: 5000,
    note: "Pasien rawat jalan",
    created_by: 1,
    created_at: "26 June 2025",
    updated_at: "26 June 2025",
  },
  {
    id: 2,
    recipient_name: "bojes",
    recipient_address: "pandaan",
    recipient_phone: 628121234,
    medicine_items: [
      { name: "Pracetamol", qty: 2 },
      { name: "Amoxicilin", qty: 1, note: "Pagi & Malam" },
    ],
    delivery_date: "26 June 2025",
    courier_id: 1,
    status: "delivered",
    payment_status: "paid",
    delivery_fee: 5000,
    note: "Pasien rawat jalan",
    created_by: 1,
    created_at: "26 June 2025",
    updated_at: "26 June 2025",
  },
  {
    id: 2,
    recipient_name: "paijo",
    recipient_address: "pandaan",
    recipient_phone: 628121234,
    medicine_items: [
      { name: "Pracetamol", qty: 2 },
      { name: "Amoxicilin", qty: 1, note: "Pagi & Malam" },
    ],
    delivery_date: "26 June 2025",
    courier_id: 1,
    status: "on_delivery",
    payment_status: "cancelled",
    delivery_fee: 5000,
    note: "Pasien rawat jalan",
    created_by: 1,
    created_at: "26 June 2025",
    updated_at: "26 June 2025",
  },
];
