"use client";

import React, { useEffect } from "react";
import { format } from "date-fns";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";

type Announcement = {
  id: number;
  title: string;
  date: string;
  description: string;
};

const announcementsData: Announcement[] = [
  {
    id: 1,
    title: "New Feature: Event Calendar Integration",
    date: "2025-05-20",
    description:
      "Our platform now supports integration with Google Calendar and Outlook Calendar. Easily sync your events with your favorite calendar apps.",
  },
  {
    id: 2,
    title: "Special Offer: 30% Off on Pro Plan",
    date: "2025-05-15",
    description:
      "Get 30% discount on the Pro subscription plan throughout May. Don’t miss this opportunity—subscribe now!",
  },
  {
    id: 3,
    title: "Update: Improved Website Loading Speed",
    date: "2025-05-10",
    description:
      "We've optimized the website performance for faster and smoother event browsing. Enjoy an enhanced experience!",
  },
  {
    id: 4,
    title: "New Payment Gateways Added",
    date: "2025-05-08",
    description:
      "Now you can pay via PayPal and Bkash, alongside Stripe. Enjoy more flexible payment options.",
  },
  {
    id: 5,
    title: "SEO Update: Better Search Engine Optimization",
    date: "2025-05-05",
    description:
      "Our website is now more SEO-friendly, helping new users find your events easier than ever before.",
  },
];

export default function AnnouncementsPage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-16 text-center text-primary tracking-tight">
        Latest Announcements
      </h1>

      <section
        ref={ref}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Latest announcements"
      >
        {announcementsData.map(({ id, title, date, description }, i) => (
          <motion.article
            key={id}
            custom={i}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 leading-tight">
              {title}
            </h2>
            <time
              dateTime={date}
              className="text-xs sm:text-sm text-primary/80 font-semibold mb-4 block"
              aria-label={`Published on ${format(
                new Date(date),
                "dd MMM yyyy"
              )}`}
            >
              {format(new Date(date), "dd MMM yyyy")}
            </time>
            <p className="text-gray-700 flex-grow leading-relaxed">
              {description}
            </p>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
