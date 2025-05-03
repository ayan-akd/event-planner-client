"use client"
import { motion } from "framer-motion";
export default function FaqSection() {
    return (
          <section className="py-16 dark:bg-black ">
                <div className="container mx-auto px-4">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12"
                  >
                    Frequently Asked Questions
                  </motion.h2>
                  
                  <div className="max-w-3xl mx-auto space-y-6">
                    {[
                      {
                        question: "How quickly do you respond to inquiries?",
                        answer: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line."
                      },
                      {
                        question: "Do you offer support for event organizers?",
                        answer: "Yes, we provide dedicated support for event organizers. Our team can help with platform navigation, best practices, and troubleshooting throughout your event planning process."
                    },
                    {
                      question: "Can I schedule a demo of the Evenzo platform?",
                      answer: "Absolutely! We offer personalized demos for organizations interested in using Evenzo for their events. Please fill out the contact form above and select 'Partnership' as the subject."
                    },
                    {
                      question: "How do I report a technical issue?",
                      answer: "For technical issues, please contact us through the form above and select 'Technical Support' as the subject. Include details about the problem, steps to reproduce it, and any error messages you received."
                    },
                    {
                      question: "Do you have office hours for walk-in consultations?",
                      answer: "We welcome visitors during our business hours, but we recommend scheduling an appointment in advance to ensure our team can dedicate proper time to address your needs."
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-black p-6 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{item.question}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
    );
}