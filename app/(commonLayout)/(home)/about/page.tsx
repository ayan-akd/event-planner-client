"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MyContainer from "@/components/modules/shared/MyContainer/MyContainer";
import aboutImage from "../../../../assets/about.png";
import mission from "../../../../assets/about-mission.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <MyContainer>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={aboutImage} // Add your hero image
              alt="Evenzo Events"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container mx-auto px-4 z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              About Evenzo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Connecting people through meaningful events
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                At Evenzo, we believe that events have the power to transform
                lives, build communities, and create lasting memories. Our
                mission is to make event planning and participation seamless,
                accessible, and enjoyable for everyone.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Whether you&apos;re organizing a small private gathering or a large
                public conference, Evenzo provides the tools and platform to
                bring people together in meaningful ways.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-80 rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src={mission} // Add relevant image
                alt="Evenzo Mission"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300 mb-12"
            >
              What We Offer
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Versatile Events",
                  description:
                    "Host or join events of any format - online webinars, in-person gatherings, hybrid experiences, and more.",
                  icon: "🌐",
                },
                {
                  title: "Privacy Options",
                  description:
                    "Create public events open to all or private events for select guests with customizable access controls.",
                  icon: "🔒",
                },
                {
                  title: "Flexible Pricing",
                  description:
                    "Organize free community events or premium paid experiences with our secure payment processing.",
                  icon: "💰",
                },
                {
                  title: "Powerful Tools",
                  description:
                    "Access comprehensive planning tools, attendee management, and real-time analytics.",
                  icon: "🛠️",
                },
                {
                  title: "Community Building",
                  description:
                    "Connect with like-minded individuals and build lasting relationships through shared experiences.",
                  icon: "👥",
                },
                {
                  title: "Seamless Experience",
                  description:
                    "Enjoy a user-friendly platform designed to make event creation and participation effortless.",
                  icon: "✨",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300 mb-8"
            >
              Our Story
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-400 space-y-4"
            >
              <p>
                Evenzo was born from a simple observation: event planning should
                be a joy, not a burden. Our founders experienced firsthand the
                challenges of organizing events and the frustration of missing
                out on interesting gatherings due to poor discovery and
                accessibility.
              </p>
              <p>
                In 2023, we set out to create a platform that would
                revolutionize how people connect through events. We envisioned a
                world where anyone could easily create, find, and participate in
                events that match their interests and preferences.
              </p>
              <p>
                Today, Evenzo serves thousands of event organizers and
                participants worldwide, facilitating connections and creating
                memorable experiences across diverse communities. From intimate
                workshops to large-scale conferences, our platform continues to
                bring people together in meaningful ways.
              </p>
              <p>
                As we grow, our commitment remains the same: to make event
                planning and participation accessible, enjoyable, and impactful
                for everyone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              Ready to Experience the Power of Events?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              Join Evenzo today and discover a world of opportunities to
              connect, learn, and grow through events.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href={"/events"}>
                <Button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </MyContainer>
  );
}
