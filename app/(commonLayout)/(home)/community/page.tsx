"use client";

import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MyContainer from "@/components/modules/shared/MyContainer/MyContainer";
import SectionTitle from "@/components/modules/shared/SectionTitle/SectionTitle";

const discussions = [
  {
    id: 1,
    title: "Best Tools for Virtual Event Hosting",
    description: `
In the ever-evolving landscape of event planning, virtual event hosting has become a pivotal solution to reach global audiences without geographical constraints. Selecting the right platform can make or break the success of your virtual gathering. In this discussion, we explore leading tools like Zoom, Microsoft Teams, Hopin, Airmeet, and more, each offering unique features such as breakout rooms, audience engagement tools, Q&A management, and live streaming capabilities. We'll delve into ease of use, scalability, cost-effectiveness, and integration with other event management software. Whether you’re planning an intimate webinar or a large-scale virtual conference, share your experiences and strategies to help fellow organizers choose the best virtual event platform tailored to their needs.
    `,
    replies: 34,
    slug: "virtual-event-hosting-tools",
  },
  {
    id: 2,
    title: "How Do You Market Your Events?",
    description: `
Effective event marketing is an art and science that involves understanding your target audience, crafting compelling messages, and utilizing the right channels to drive attendance and engagement. From social media advertising, email campaigns, influencer partnerships, SEO optimization, to content marketing, this discussion is the perfect place to share your tried-and-true strategies as well as innovative approaches. Learn how to analyze campaign performance using analytics tools, segment your audience for personalized outreach, and maximize ROI through multi-channel marketing. Whether promoting local workshops or international conferences, your insights can empower others to elevate their event promotion game.
    `,
    replies: 47,
    slug: "event-marketing-strategies",
  },
  {
    id: 3,
    title: "Event Budgeting Tips",
    description: `
Budgeting is one of the most critical components of successful event planning. Managing your finances efficiently ensures that your event delivers impact without overspending. In this discussion, we cover comprehensive budgeting techniques, including setting realistic cost estimates, tracking expenses, securing sponsorships, and balancing ticket pricing to maximize revenue while maintaining affordability. Share your experiences on using budgeting software, handling unexpected expenses, negotiating with vendors, and creative cost-saving tips that don’t compromise quality. By discussing these practices, organizers can better prepare for financial challenges and ensure smooth event execution.
    `,
    replies: 21,
    slug: "event-budgeting-tips",
  },
];

export default function CommunityPage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <MyContainer>
      <section className="text-center mb-16">
        <SectionTitle
          sectionSubTitle="Connect with fellow organizers, exchange ideas, ask questions, and
          grow your event planning skills."
          sectionTitle="🌍 Event Community Forum"
        />
        <Button className="mt-6 px-6 py-2 dark:text-white">
          <Link href="/login">Join the Discussion</Link>
        </Button>
      </section>

      <section ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {discussions.map(({ id, title, description, replies, slug }, i) => (
          <motion.div
            key={id}
            custom={i}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
          >
            <Card className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between ">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-100 mb-4">
                  {description?.slice(0, 100)}...
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium text-primary dark:text-white">
                  💬 {replies} Replies
                </span>
                <Link
                  href={`/community/${slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>
    </MyContainer>
  );
}
