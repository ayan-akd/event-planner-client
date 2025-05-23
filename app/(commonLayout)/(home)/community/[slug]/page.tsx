"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { discussions } from "@/faker/discuss";
import { TReply } from "@/types/blog.types";

export default function CommunityDetailsPage() {
  const { slug } = useParams();

  const slugStr = Array.isArray(slug) ? slug[0] : slug;

  const post = slugStr ? discussions[slugStr] : null;

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replies, setReplies] = useState<TReply[]>(post?.replies || []);
  const [replyContent, setReplyContent] = useState("");
  const [replyName, setReplyName] = useState("");

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  useEffect(() => {
    // Update replies if post changes (on slug change)
    if (post) {
      setReplies(post.replies);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-32 text-gray-600 text-xl">
        Discussion not found.
      </div>
    );
  }

  const replyVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  function handleReplySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!replyName.trim() || !replyContent.trim()) return;

    const newReply: TReply = {
      id: replies.length + 1,
      name: replyName.trim(),
      content: replyContent.trim(),
      time: "Just now",
    };

    setReplies([...replies, newReply]);
    setReplyContent("");
    setReplyName("");
    setShowReplyModal(false);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Discussion Title & Description */}
      <article className="mb-12">
        <h1 className="text-4xl font-bold text-primary mb-6">{post.title}</h1>
        <p className="text-gray-700 dark:text-gray-100 whitespace-pre-line leading-relaxed text-lg">
          {post.description}
        </p>
      </article>

      {/* Replies Section */}
      <section ref={ref} aria-labelledby="replies-heading">
        <div className="flex justify-between items-center mb-6">
          <h2
            id="replies-heading"
            className="text-3xl font-semibold text-primary dark:text-white"
          >
            💬 Replies ({replies.length})
          </h2>
          <Button
            variant="outline"
            onClick={() => setShowReplyModal(true)}
            className="text-primary dark:text-white"
          >
            Add Reply
          </Button>
        </div>

        {replies.length === 0 && (
          <p className="text-gray-500 dark:text-gray-100">
            No replies yet. Be the first to reply!
          </p>
        )}

        <div className="space-y-6">
          {replies.map((reply, i) => (
            <motion.div
              key={reply.id}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={replyVariants}
            >
              <Card className="p-6 border border-gray-200 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {reply.name}
                  </span>
                  <span className="text-sm text-gray-400">{reply.time}</span>
                </div>
                <p className="text-gray-700 dark:text-white">{reply.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reply Modal */}
      {showReplyModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          onClick={() => setShowReplyModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="modal-title"
              className="text-xl font-bold text-primary mb-4"
            >
              Add a Reply
            </h3>
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="replyName"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  id="replyName"
                  type="text"
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="replyContent"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Your Reply
                </label>
                <textarea
                  id="replyContent"
                  rows={4}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowReplyModal(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
