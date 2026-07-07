import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartItem = { productId: string; quantity: number; weight: string };

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (productId: string, weight?: string, quantity?: number) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  cartWithProducts: Array<CartItem & { product: Product }>;
};

const ShopContext = createContext<ShopState | null>(null);
const CART_KEY = "tatvan.cart";
const WISH_KEY = "tatvan.wishlist";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value: ShopState = useMemo(() => {
    const cartWithProducts = cart
      .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId)! }))
      .filter((c) => c.product);
    const subtotal = cartWithProducts.reduce((s, i) => s + i.product.price * i.quantity, 0);
    return {
      cart,
      wishlist,
      cartWithProducts,
      subtotal,
      cartCount: cart.reduce((s, i) => s + i.quantity, 0),
      wishlistCount: wishlist.length,
      addToCart: (productId, weight, quantity = 1) => {
        const product = products.find((p) => p.id === productId);
        const w = weight ?? product?.weightOptions[0] ?? "default";
        setCart((prev) => {
          const existing = prev.find((i) => i.productId === productId && i.weight === w);
          if (existing) {
            return prev.map((i) =>
              i.productId === productId && i.weight === w ? { ...i, quantity: i.quantity + quantity } : i,
            );
          }
          return [...prev, { productId, weight: w, quantity }];
        });
      },
      updateQuantity: (productId, weight, quantity) =>
        setCart((prev) =>
          quantity <= 0
            ? prev.filter((i) => !(i.productId === productId && i.weight === weight))
            : prev.map((i) => (i.productId === productId && i.weight === weight ? { ...i, quantity } : i)),
        ),
      removeFromCart: (productId, weight) =>
        setCart((prev) => prev.filter((i) => !(i.productId === productId && i.weight === weight))),
      clearCart: () => setCart([]),
      toggleWishlist: (productId) =>
        setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId])),
      isWishlisted: (productId) => wishlist.includes(productId),
    };
  }, [cart, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
