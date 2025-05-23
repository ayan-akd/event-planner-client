import { getSuggestedEvents } from "@/services/Event";
import SuggestedProductItem from "./SuggestedProductItem";
import { TEvent } from "@/types/event.type";

const products = [
  {
    id: "p1",
    name: "Floral Wedding Arch",
    description: "Beautifully decorated arch with fresh flowers.",
    price: 299,
    image: "/images/wedding-arch.jpg",
    tag: "Wedding",
  },
  {
    id: "p2",
    name: "LED Party Lights",
    description: "Add vibrant mood to your event with multicolor lights.",
    price: 59,
    image: "/images/party-lights.jpg",
    tag: "Lighting",
  },
  {
    id: "p3",
    name: "Corporate Booth Setup",
    description: "Complete branding booth with backdrop and LED signage.",
    price: 449,
    image: "/images/corporate-booth.jpg",
    tag: "Corporate",
  },
];

export default async function SuggestedProductList({
  isPrivate,
  fee,
}: {
  isPrivate: boolean;
  fee: number;
}) {
  const { data } = await getSuggestedEvents(isPrivate, fee);
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-10">Suggested Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data?.result?.slice(0, 6).map((product: TEvent) => (
          <SuggestedProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
