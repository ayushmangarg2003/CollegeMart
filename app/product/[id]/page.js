"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dummyData } from "@/libs/dummyData"; // Corrected import path
import { useParams } from "next/navigation";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams(); // Get the route params (id)

  useEffect(() => {
    if (!params.id) return; // Ensure the id is available before fetching

    const fetchProduct = () => {
      const productId = params.id;
      const productData = dummyData.find((p) => p.id === parseInt(productId));
      if (productData) {
        setProduct(productData);
      } else {
        console.log("Product not found");
      }
    };

    fetchProduct();
    setLoading(false); // Set loading to false after fetching
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <h1 className="text-3xl">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full max-w-md" />
      <p className="mt-4">Price: {product.price}</p>
      <p className="mt-2">Tags: {product.tags.join(", ")}</p>
      <p className="mt-6">
        {product.description || "No description available"}
      </p>
    </div>
  );
};

export default ProductDetails;
