import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { ToggleButton } from "../ui/ToggleButton";
import { getCurrentUser } from "@/services/AuthServices.ts";
import {
  getMyReceivedInvites,
  getNotificationCount,
} from "@/services/Invitations";
import NotificationDropdown from "../dashboard-components/user-dashboard/Notifications/NotificationDropdown";

interface NavbarProps {
  title: string;
}

export async function DashboardNavbar({ title }: NavbarProps) {
  const user = await getCurrentUser();
  const { data: count } = await getNotificationCount();
  const { data } = await getMyReceivedInvites();
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center gap-4 justify-end">
          {user && user.role === "USER" && (
            <NotificationDropdown count={count.id} data={data} />
          )}
          <ToggleButton />
        </div>
      </div>
    </header>
  );
}
