import { useParams } from "react-router";

const ProductPage = () => {
  const { id } = useParams();

  return <div>Product with id: {id}</div>;
};

export default ProductPage;
