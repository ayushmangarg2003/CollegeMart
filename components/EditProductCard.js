import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const EditProductCard = ({ product }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="group relative bg-white border hover:border-[#cc0000] shadow-md hover:shadow-xl transition-all duration-300">
        <Link href={`/edit/${product.id}`}>
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={product.image || "/placeholder-image.jpg"}
              alt={product.name}
              width={300}
              height={200}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            
            {product.originalPrice > product.price && (
              <div className="absolute top-3 left-3 bg-[#cc0000] text-white px-3 py-1 text-sm font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </div>
            )}
            
            {product.condition && (
              <div className="absolute bottom-3 left-3 bg-neutral-800 bg-opacity-70 text-white px-3 py-1 text-sm">
                {product.condition}
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg group-hover:text-[#cc0000] transition-colors duration-200">
                {product.name}
              </h3>
              <ArrowRight className="h-5 w-5 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#cc0000]" />
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div className="flex items-baseline gap-2">
                <p className="text-lg font-bold text-[#cc0000]">
                  ${product.price?.toLocaleString()}
                </p>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice?.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Details
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EditProductCard;
