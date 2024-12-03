import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className="border rounded-lg flex flex-col gap-4 hover:shadow-lg transition-shadow"
      aria-label={`View details for ${product.title}`}
    >
      <div className="aspect-square relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-semibold line-clamp-1">{product.title}</h2>
        <p className="text-green-600 font-bold">${product.price}</p>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <AiFillStar className="text-yellow-400" />
            {product.rating.rate}
          </span>
          <span className="text-sm text-gray-500">
            ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
