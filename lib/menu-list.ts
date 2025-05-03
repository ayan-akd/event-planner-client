import {
  LucideIcon,
  User2,
  Bell,
  Calendar,
  Mail,
  Star,
  Users,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(role: string): Group[] {
  const adminMenus = [
    {
      groupLabel: "Admin Controls",
      menus: [
        {
          href: "/dashboard/admin/events",
          label: "Events",
          icon: Calendar,
        },
        {
          href: "/dashboard/admin/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/dashboard/admin/reviews",
          label: "Reviews",
          icon: Star,
        },
      ],
    },
    {
      groupLabel: "SETTINGS",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profile",
          icon: User2,
        },
      ],
    },
  ];

  const userMenus = [
    {
      groupLabel: "USER CONTROLS",
      menus: [
        {
          href: "/dashboard/user/events",
          label: "My Events",
          icon: Calendar,
        },
        {
          href: "/dashboard/user/invitations",
          label: "Invitations",
          icon: Mail,
        },
        {
          href: "/dashboard/user/reviews",
          label: "Reviews",
          icon: Star,
        },
      ],
    },
    {
      groupLabel: "SETTINGS",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profile",
          icon: User2,
        },
        {
          href: "/dashboard/user/notification",
          label: "Notifications",
          icon: Bell,
        },
      ],
    },
  ];

  return role === "ADMIN" ? [...adminMenus] : [...userMenus];
}
