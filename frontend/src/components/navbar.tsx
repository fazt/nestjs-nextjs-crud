import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-gray-950 px-20 flex justify-between items-center py-5    ">
      <Link href="/products" className="font-bold text-lg">
        <h1>ProductsDB</h1>
      </Link>

      <ul className="flex gap-x-2">
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/products/new">New Product</Link>
        </li>
      </ul>
    </nav>
  );
}
