"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import contactImage from "../../../../assets/contact.png";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.success("Message sent successfully!");
    setSubmitStatus("success");
  };


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={contactImage} // Add your contact page hero image
            alt="Contact Evenzo"
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            We&apos;d love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-white mb-8">
                Have questions about Evenzo? Want to partner with us? Or just
                want to say hello? We&apos;re here to help and would love to
                hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full text-blue-600">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Our Location
                  </h3>
                  <p className="text-gray-600 dark:text-white">
                    123 Event Avenue, Suite 200
                    <br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full text-blue-600">
                  <FaPhone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Phone Number
                  </h3>
                  <p className="text-gray-600 dark:text-white">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full text-blue-600">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Email Address
                  </h3>
                  <p className="text-gray-600 dark:text-white">
                    hello@evenzo.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full text-blue-600">
                  <FaClock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Business Hours
                  </h3>
                  <p className="text-gray-600 dark:text-white">
                    Monday - Friday: 9am - 6pm
                    <br />
                    Saturday: 10am - 4pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  title="twitter"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-purple-100 hover:text-blue-600 transition-colors"
                >
                  <BsTwitterX size={20} />
                </a>
                <a
                  title="facebook"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-purple-100 hover:text-blue-600 transition-colors"
                >
                  <BsFacebook size={20} />
                </a>
                <a
                  title="instagram"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-purple-100 hover:text-blue-600 transition-colors"
                >
                  <BsInstagram size={20} />
                </a>
                <a
                  title="linkedin"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-purple-100 hover:text-blue-600 transition-colors"
                >
                  <BsLinkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-black rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Send Us a Message
              </h2>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                  Thank you for your message! We&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                  There was an error sending your message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                    placeholder="Your Email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
