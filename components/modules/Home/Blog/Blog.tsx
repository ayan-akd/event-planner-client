import { dummyPosts } from "@/faker/blog";
import BlogPostCard from "./BlogPostCard";
import { TBlogPost } from "@/types/blog.types";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import MyContainer from "../../shared/MyContainer/MyContainer";

export default function BlogSection() {
  return (
    <div className=" pb-10">
      <MyContainer>
        <SectionTitle
          sectionTitle="Latest Blog Posts"
          sectionSubTitle="Insights, stories, and tips to keep you informed and inspired."
        />

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {dummyPosts.map((post: TBlogPost) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </MyContainer>
    </div>
  );
}
