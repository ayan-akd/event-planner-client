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
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter to receive the latest updates, event
            tips, and special offers.
          </p>

          <form
            onSubmit={handleNewsLetterSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg flex-grow max-w-md border text-white  placeholder:text-white focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <p className="text-sm mt-4 text-purple-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
