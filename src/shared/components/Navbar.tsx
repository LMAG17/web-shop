import { CartBadge } from "@/modules/cart/presentation/components/CartBadge";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-semibold text-xl">
          NextCommerce
        </Link>
        <CartBadge />
      </div>
    </nav>
  );
};
