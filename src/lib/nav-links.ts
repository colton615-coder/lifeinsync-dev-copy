import type { LucideIcon } from "lucide-react";
import { 
  LayoutDashboard, 
  CheckCircle, 
  Wallet, 
  Bot, 
  Dumbbell, 
  ListTodo, 
  ShoppingCart, 
  Calendar,
  Lock
} from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  group?: string;
};

export type NavGroup = {
  label: string;
  items: NavLink[];
};

export const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { href: "/tasks", label: "Tasks", icon: ListTodo, group: "Productivity" },
  { href: "/calendar", label: "Calendar", icon: Calendar, group: "Productivity" },
  { href: "/habits", label: "Habit Tracker", icon: CheckCircle, group: "Health & Wellness" },
  { href: "/workouts", label: "Workouts", icon: Dumbbell, group: "Health & Wellness" },
  { href: "/finance", label: "Finance", icon: Wallet, group: "Finance & Planning" },
  { href: "/shopping", label: "Shopping List", icon: ShoppingCart, group: "Finance & Planning" },
  { href: "/ai-knox", label: "AI Companion", icon: Bot, group: "Personal" },
  { href: "/vault", label: "Secure Vault", icon: Lock, group: "Personal" },
];

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: navLinks.filter(link => link.group === "Overview")
  },
  {
    label: "Productivity",
    items: navLinks.filter(link => link.group === "Productivity")
  },
  {
    label: "Health & Wellness",
    items: navLinks.filter(link => link.group === "Health & Wellness")
  },
  {
    label: "Finance & Planning",
    items: navLinks.filter(link => link.group === "Finance & Planning")
  },
  {
    label: "Personal",
    items: navLinks.filter(link => link.group === "Personal")
  }
];
