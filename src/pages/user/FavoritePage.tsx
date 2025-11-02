import useFavorites from "@/hooks/use-favorites";
import ProductCard from "@/components/ProductCard";

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0)
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="rounded-xl border p-6 text-center">
          <p className="text-sm sm:text-base text-muted-foreground">
            هیچ محصول مورد علاقه‌ای وجود ندارد.
          </p>
        </div>
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold sm:text-xl">محصولات مورد علاقه</h1>
        <span className="text-sm text-muted-foreground">
          تعداد: {favorites.length}
        </span>
      </div>

      <div
        className="
          grid gap-4
          grid-cols-1
          xs:grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {favorites.map((product) => (
          <div
            key={product._id}
            className="
              group
              rounded-xl
              border
              p-2 sm:p-3
              transition
              hover:shadow-sm
              [&_.lucide-heart]:text-muted-foreground
              [&_.lucide-heart]:fill-current
            "
          >
            <ProductCard
              product={product}
              toggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

