// components/ProductCard.js
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 p-4">
      <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover rounded-lg"
          />
          <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
          <p className="mt-1 text-gray-500">{product.price}</p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
