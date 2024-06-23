"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Product, createProduct, deleteProduct } from "../products.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, {
    message: "Price must be at least 0.01",
  }),
});

type ProductForm = z.infer<typeof productSchema>;

export function ProductForm({
  foundProduct,
}: {
  foundProduct: Product | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: foundProduct?.name ?? "",
      description: foundProduct?.description ?? "",
      price: foundProduct?.price ?? 0,
    },
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newProduct = await createProduct(data);
      toast.success(`Product ${newProduct.name} created`);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  });

  return (
    <form className="flex flex-col gap-y-3" onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        className="border border-gray-800 bg-gray-950 rounded-md w-full p-2"
        {...register("name")}
      />
      {errors.name?.message && (
        <p className="text-red-500">{errors.name.message.toString()}</p>
      )}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        className="border border-gray-800 bg-gray-950 rounded-md w-full p-2"
        {...register("description")}
      />

      <label htmlFor="price">Price</label>

      <input
        type="number"
        id="price"
        className="border border-gray-800 bg-gray-950 rounded-md w-full p-2"
        {...register("price")}
      />
      {errors.price?.message && (
        <p className="text-red-500">{errors.price.message.toString()}</p>
      )}
      <div className="flex gap-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 mt-2 w-full"
        >
          Create
        </button>
        {foundProduct && (
          <button
            onClick={async () => {
              if (
                window.confirm("Are you sure you want to delete this product?")
              ) {
                try {
                  await deleteProduct(foundProduct.id);

                  router.push("/products");
                  router.refresh();

                  toast.success(`Product ${foundProduct.name} deleted`);
                } catch (error) {
                  toast.error("Failed to delete product");
                }
              }
            }}
            type="button"
            className="bg-red-500 text-white rounded-md p-2 mt-2 w-full"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
