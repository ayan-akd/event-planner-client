import {
    SquarePen,
    LayoutGrid,
    LucideIcon,
    LayoutList,
    UserPenIcon,
    DollarSignIcon,
    User2,
    Bell
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
    const commonMenus = [
      {
        groupLabel: "USER CONTROLS",
        menus: [
          {
            href: "/dashboard/user/events",
            label: "My Events",
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
    ];
  
    const adminMenus = [
      {
        groupLabel: "Admin Controls",
        menus: [
          {
            href: "/dashboard/admin/manage-medicines",
            label: "Manage Medicines",
            icon: SquarePen,
          },
          {
            href: "/dashboard/admin/manage-orders",
            label: "Manage Orders",
            icon: LayoutList,
          },
          {
            href: "/dashboard/admin/manage-users",
            label: "Manage Users",
            icon: UserPenIcon,
          },
          {
            href: "/dashboard/admin/manage-payments",
            label: "Manage Payments",
            icon: DollarSignIcon,
          },
        ],
      },
    ];
  
    const userMenus = [
      {
        groupLabel: "SETTINGS",
        menus: [
          {
            href: "/dashboard/profile",
            label: "Profile",
            icon: User2,
          },
          {
            href: "/dashboard/profile",
            label: "Notifications",
            icon: Bell,
          },
        ],
      },
    ];
  
    return role === "admin" ? [...commonMenus, ...adminMenus] : [...commonMenus, ...userMenus];
  }
  