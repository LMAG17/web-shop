import { CartItem } from "@/modules/cart/domain/cart.types";
import ProductButtons from "@/modules/products/presentation/components/ProductButtons";
import Image from "next/image";

interface Props {
  item: CartItem;
}

export const CartItemComponent = ({ item }: Props) => {
  return (
    <div className="flex items-center justify-between border-b py-3">
      <div className="flex items-center gap-4">
        <Image
          src={item.product.thumbnail}
          alt={item.product.title}
          width={60}
          height={60}
          className="rounded"
        />
        <div>
          <h4 className="font-semibold">{item.product.title}</h4>
          <p className="text-sm text-gray-500">
            ${item.product.price} × {item.quantity}
          </p>
        </div>
      </div>
      <ProductButtons product={item.product} />
    </div>
  );
};
