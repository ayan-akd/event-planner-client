export type TBlogPost = {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  publishedAt: string;
};

export type TReply = {
  id: number;
  name: string;
  content: string;
  time: string;
};
export type TDiscussion = {
  title: string;
  description: string;
  replies: TReply[];
};
