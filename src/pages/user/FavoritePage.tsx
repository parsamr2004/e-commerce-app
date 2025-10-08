import React from "react";
import ProductCard from "@/components/ProductCard";

const FavoritesPage = () => {
  const products = [1, 2];
  // ورودی موقت برای دیدن نتیجه کار بعدا با استیت مینویسم

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="[&_.lucide-heart]:text-primary [&_.lucide-heart]:fill-primary"
          >
            <ProductCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
