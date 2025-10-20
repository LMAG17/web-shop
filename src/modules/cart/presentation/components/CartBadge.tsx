"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/core/store/hooks";
import { selectCartCount } from "@/modules/cart/data/state/cartSelectors";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const CartBadge = () => {
  const count = useAppSelector(selectCartCount);

  return (
    <div className="relative">
      <Link href="/cart" className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="w-5 h-5" />
        </Button>
        {count > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
            {count}
          </Badge>
        )}
      </Link>
    </div>
  );
};
