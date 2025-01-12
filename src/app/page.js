import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-950 to-cyan-200">
     <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-4xl text-sky-100 font-bold mb-4">Browse our Blog Collections</h2>
     <Link href={"/blogs"} className="bg-white text-sm text-blue-700 font-semibold py-2 px-6 rounded">Explore Blogs</Link>
    </div>
     </div>
  );
}
