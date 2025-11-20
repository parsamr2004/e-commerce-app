import ProductPreviewCard from "@/components/ProductPreviewCard";
import useProducts from "@/hooks/use-products";
import useAuthStore from "@/stores/use-auth-store";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const { data: allProducts } = useProducts();
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <div className="mx-auto p-4 pt-16 max-w-6xl">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allProducts?.map((product) => (
          <ProductPreviewCard
            key={product._id}
            _id={product._id}
            image={product.image}
            name={product.name}
            createdAt={product.createdAt}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

