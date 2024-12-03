import Products from "./components/Products";

export default function Home() {
 

  return (
    <main className="w-full">
      <div className="container py-16">
        <h1 className="text-5xl font-bold mb-6">Game Store</h1>
        <p className="text-lg text-gray-600 mb-12">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est eveniet voluptates dolorem porro rem impedit cum totam dolor, officia perspiciatis optio quasi autem voluptate ipsum ullam, odit rerum minus repudiandae?</p>
        <Products />
      </div>
    </main>
  );
}
