import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <Link 
        href="/" 
        className="inline-block mb-8 text-blue-600 hover:underline"
      >
        ← Back to products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          
          <div className="flex items-center gap-4">
            <p className="text-2xl text-green-600 font-bold">
              ${product.price}
            </p>
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

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Category</h2>
            <p className="text-gray-600 capitalize">{product.category}</p>
          </div>

          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
