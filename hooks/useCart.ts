import { cartAtom } from '@/atoms/cartAtom';
import { Product } from '@/types/product';
import { atom, useAtom } from 'jotai';

export function useCart() {
  const [cart, setCart] = useAtom(cartAtom);
  const cartItemCount = atom((get) =>
    get(cartAtom).reduce((acc, item) => acc + item.quantity, 0)
  );

  const addToCart = (product: Product, quantity?: number) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + (quantity ?? 1)),
              }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { product, quantity: quantity ?? 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    cartItemCount,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
