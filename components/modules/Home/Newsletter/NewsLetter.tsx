"use client";
import React from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
export default function NewsLetter() {
  const handleNewsLetterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter!");
  };

  return (
    <section className="py-16 bg-primary bg-gradient-to-r from-primary/90 to-primary/70 text-white shadow-md rounded-lg mt-12 md:mt-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 tracking-wide drop-shadow-sm">
            Stay Updated
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto drop-shadow-sm">
            Subscribe to our newsletter to receive the latest updates, event
            tips, and special offers.
          </p>

          <form
            onSubmit={handleNewsLetterSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md flex-grow border border-white/30 bg-white/20 text-white placeholder-white
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60
                     transition duration-300"
              required
            />
            <button
              type="submit"
              className="bg-white text-primary px-5 py-2 rounded-md font-semibold hover:bg-white/90
                     transition-colors shadow-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <p className="text-sm mt-5 text-white/80 italic drop-shadow-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
