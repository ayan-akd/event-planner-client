import { getAllEvents } from "@/services/Event";
import CommonBanner from "../shared/CommonBanner/CommonBanner";
import MyContainer from "../shared/MyContainer/MyContainer";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import AllEvents from "./AllEvents/AllEvents";
type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const Events = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const query = await searchParams;
  const { data } = await getAllEvents(query);
  return (
    <div>
      <CommonBanner mainComponentTitle="Home" subComponentTitle="Events" />
      <MyContainer>
        <SectionTitle
          sectionSubTitle="Browse through all public and private events in one place."
          sectionTitle="Explore All Events"
        />
        <AllEvents events={data} />
      </MyContainer>
    </div>
  );
};

export default Events;
