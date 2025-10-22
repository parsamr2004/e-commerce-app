import useFavorites from "@/hooks/use-favorites";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router";

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  if (favorites.length === 0) return <p className="p-6">هیچ محصول مورد علاقه‌ای وجود ندارد.</p>;

  return (
    <div className="p-6">
      <div className="grid auto-cols-min auto-rows-min grid-cols-1 gap-6 sm:grid-cols-4">
        {favorites.map((product) => (
          <div
            key={product._id}
            className="[&_.lucide-heart]:text-muted [&_.lucide-heart]:fill-muted"
          >
            <Link to={`/products/${product._id}`} key={product._id}>
              <ProductCard product={product} toggleFavorite={toggleFavorite} isFavorite={true} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
