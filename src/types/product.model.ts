import type { Category } from "./category.model";
import type { Review } from "./review.model";

export type Product = {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  category?: Category;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
};
