import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TEvent } from "@/types/event.type";

export default function SuggestedProductItem({ product }: { product: TEvent }) {
  return (
    <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 group overflow-hidden">
      <CardHeader className="p-0 relative">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={250}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* {product.tag && (
          <Badge className="absolute top-4 left-4 bg-primary text-white text-xs">
            {product.tag}
          </Badge>
        )} */}
        <Badge className="absolute top-4 right-4 bg-green-600 text-white text-xs">
          ${product.fee}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary">
          {product.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2 mb-4">
          {product.description.slice(0, 100)}...
        </p>
        <div className="flex justify-end">
          <Link href={`/events/${product.id}`}>
            <Button variant="outline">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
