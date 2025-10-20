import type { Review } from "./review.model.ts";

export type Product = {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
};
