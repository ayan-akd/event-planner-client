"use client";

import Link from "next/link";
import Image from "next/image";
import { TBlogPost } from "@/types/blog.types";

type Props = {
  post: TBlogPost;
};

const BlogPostCard = ({ post }: Props) => {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative h-56 w-full rounded-t-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <Link
          href={`/blog/${post.slug}`}
          className="text-2xl font-semibold text-gray-900 hover:text-primary transition-colors mb-3"
        >
          {post.title}
        </Link>

        <p className="text-gray-700 flex-grow line-clamp-4">{post.excerpt}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-primary font-semibold hover:underline"
          >
            Read More &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
