import { ContentLayout } from "@/components/admin-panel/content-layout"
import UserDashboardEventsComponent from "@/components/dashboard-components/user-dashboard/UserDashboardEventsComponent";
import { getAllEvents } from "@/services/Event";

export default async function UserDashboardEventsPage() {
    const {data} = await getAllEvents({undefined});
    return (
        <div>
            <ContentLayout title="MY EVENTS">
                <UserDashboardEventsComponent events={data} />
            </ContentLayout>
        </div>
    );
}