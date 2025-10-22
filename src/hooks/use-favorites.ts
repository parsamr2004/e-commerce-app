import { useState, useEffect } from "react";
import type { Product } from "@/types/product.model";

const FAVORITES_STORAGE_KEY = "my_app_favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const isFav = prev.some((p) => p._id === product._id);
      let updated;
      if (isFav) {
        updated = prev.filter((p) => p._id !== product._id);
      } else {
        updated = [...prev, product];
      }
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.some((p) => p._id === productId);
  };

  return { favorites, toggleFavorite, isFavorite };
}
