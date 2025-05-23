import { TDiscussion } from "@/types/blog.types";

export const discussions: Record<string, TDiscussion> = {
  "virtual-event-hosting-tools": {
    title: "Best Tools for Virtual Event Hosting",
    description: `
In the ever-evolving landscape of event planning, virtual event hosting has become a pivotal solution to reach global audiences without geographical constraints. Selecting the right platform can make or break the success of your virtual gathering. In this discussion, we explore leading tools like Zoom, Microsoft Teams, Hopin, Airmeet, and more, each offering unique features such as breakout rooms, audience engagement tools, Q&A management, and live streaming capabilities. We'll delve into ease of use, scalability, cost-effectiveness, and integration with other event management software. Whether you’re planning an intimate webinar or a large-scale virtual conference, share your experiences and strategies to help fellow organizers choose the best virtual event platform tailored to their needs.
    `,
    replies: [
      {
        id: 1,
        name: "Alice",
        content: "I found Hopin super user-friendly and scalable.",
        time: "2h ago",
      },
      {
        id: 2,
        name: "John",
        content: "Zoom + OBS combo worked great for hybrid setups.",
        time: "1h ago",
      },
    ],
  },
  "event-marketing-strategies": {
    title: "How Do You Market Your Events?",
    description: `
Effective event marketing is an art and science that involves understanding your target audience, crafting compelling messages, and utilizing the right channels to drive attendance and engagement. From social media advertising, email campaigns, influencer partnerships, SEO optimization, to content marketing, this discussion is the perfect place to share your tried-and-true strategies as well as innovative approaches. Learn how to analyze campaign performance using analytics tools, segment your audience for personalized outreach, and maximize ROI through multi-channel marketing. Whether promoting local workshops or international conferences, your insights can empower others to elevate their event promotion game.
    `,
    replies: [
      {
        id: 1,
        name: "Sara",
        content: "Instagram Reels worked wonders for our concert promo.",
        time: "3h ago",
      },
      {
        id: 2,
        name: "Mike",
        content:
          "Don't underestimate the power of email segmentation for targeted campaigns.",
        time: "2h ago",
      },
    ],
  },
  "event-budgeting-tips": {
    title: "Event Budgeting Tips",
    description: `
Budgeting is one of the most critical components of successful event planning. Managing your finances efficiently ensures that your event delivers impact without overspending. In this discussion, we cover comprehensive budgeting techniques, including setting realistic cost estimates, tracking expenses, securing sponsorships, and balancing ticket pricing to maximize revenue while maintaining affordability. Share your experiences on using budgeting software, handling unexpected expenses, negotiating with vendors, and creative cost-saving tips that don’t compromise quality. By discussing these practices, organizers can better prepare for financial challenges and ensure smooth event execution.
    `,
    replies: [
      {
        id: 1,
        name: "Emma",
        content:
          "Always build a contingency fund of 10-15% for unexpected expenses.",
        time: "5h ago",
      },
      {
        id: 2,
        name: "David",
        content:
          "Using spreadsheet templates saved me hours when planning budgets.",
        time: "4h ago",
      },
    ],
  },
};
