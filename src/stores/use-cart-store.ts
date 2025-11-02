import type { Product } from "@/types/product.model";
import { create } from "zustand";

interface IuseCartStore {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  deleteItems: () => void;
}

const useCartStore = create<IuseCartStore>((set) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => {
      const exist = state.cartItems.some((item) => item._id === product._id);

      if (exist) return state;

      return {
        cartItems: [...state.cartItems, product],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item._id === productId ? { ...item, countInBasket: quantity } : item
      ),
    })),

  deleteItems: () =>
    set(() => ({
      cartItems: [],
    })),
}));

export default useCartStore;
