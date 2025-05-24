"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const cities = [
  {
    name: "Dhaka",
    events: "1,200+ Events",
    highlight: "Special offer on corporate events!",
  },
  {
    name: "Chattogram",
    events: "800+ Events",
    highlight: "Top destination for weddings",
  },
  {
    name: "Sylhet",
    events: "400+ Events",
    highlight: "Premium locations for private events",
  },
  {
    name: "Rajshahi",
    events: "300+ Events",
    highlight: "Student discounts available",
  },
  {
    name: "Khulna",
    events: "200+ Events",
    highlight: "Growing community of event planners",
  },
  {
    name: "Barishal",
    events: "150+ Events",
    highlight: "Riverside events are trending",
  },
];

export default function PopularLocations() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Popular Event Locations
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover the most active cities for events across Bangladesh.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="shadow-md hover:shadow-xl transition rounded-2xl border border-muted">
                <CardHeader>
                  <CardTitle className="text-xl">{city.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{city.events}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    {city.highlight}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
