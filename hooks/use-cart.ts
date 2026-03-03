import { create } from 'zustand';
import { Variant, Product } from '@/lib/data';

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  color: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant: Variant) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  addItem: (product, variant) => set((state) => {
    const existingItem = state.items.find((item) => item.variantId === variant.id);
    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        isOpen: true,
      };
    }
    return {
      items: [
        ...state.items,
        {
          variantId: variant.id,
          productId: product.id,
          title: product.title,
          color: variant.color,
          size: variant.size,
          price: variant.sale_price || variant.price,
          image: variant.image,
          quantity: 1,
        },
      ],
      isOpen: true,
    };
  }),
  removeItem: (variantId) => set((state) => ({
    items: state.items.filter((item) => item.variantId !== variantId),
  })),
  updateQuantity: (variantId, quantity) => set((state) => ({
    items: state.items.map((item) =>
      item.variantId === variantId ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0),
  })),
  clearCart: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));
