import Events from "@/components/modules/Event";
type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const EventPage = async ({ searchParams }: { searchParams: TSearchParams }) => {
  return (
    <div>
      <Events searchParams={searchParams} />
    </div>
  );
};

export default EventPage;
