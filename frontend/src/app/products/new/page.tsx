import { redirect } from "next/navigation";
import { getProduct } from "../products.api";
import { ProductForm } from "./product-form";

export default async function ProductNewPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  let foundProduct = null;

  if (params.id) {
    try {
      foundProduct = await getProduct(Number(params.id));
    } catch (error) {
      redirect("/products");
    }
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] flex justify-center items-center">
      <ProductForm foundProduct={foundProduct} />
    </div>
  );
}
