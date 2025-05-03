export const reviewsData = [
  {
    id: "rev1",
    userId: {
      name: "Nahid Hasan",
      image:
        "https://res.cloudinary.com/djlpoyqau/image/upload/v1741195711/clinets-profile_gwta7f.png",
    },
    ratings: 4.5,
    review:
      "Very professional service. I am highly satisfied with the support and timely delivery.",
    createdAt: "2025-04-28T14:23:00Z",
  },
  {
    id: "rev2",
    userId: {
      name: "Ayesha Rahman",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    ratings: 5.0,
    review:
      "Excellent experience! The team went above and beyond to meet my needs.",
    createdAt: "2025-04-25T09:45:00Z",
  },
  {
    id: "rev3",
    userId: {
      name: "Rafiul Islam",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    ratings: 4.0,
    review: "Good overall, but there was a slight delay in response time.",
    createdAt: "2025-04-22T18:10:00Z",
  },
];

export type TFakeReviewType = {
  id: string;
  userId: {
    name: string;
    image: string;
  };
  ratings: number;
  review: string;
  createdAt: string;
};
