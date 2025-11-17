import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  quantity: number;
  imageUrl?: string;
  sku: string;
  stockQuantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  getTax: () => number;
  getShipping: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (i) => i.productId === item.productId
        );

        if (existingItemIndex > -1) {
          // Item exists, update quantity
          const updatedItems = [...items];
          const newQuantity = updatedItems[existingItemIndex].quantity + (item.quantity || 1);

          // Check stock
          if (newQuantity > item.stockQuantity) {
            console.warn('Insufficient stock');
            return;
          }

          updatedItems[existingItemIndex].quantity = newQuantity;
          set({ items: updatedItems });
        } else {
          // New item
          const newItem: CartItem = {
            ...item,
            quantity: item.quantity || 1,
          };

          // Check stock
          if (newItem.quantity > newItem.stockQuantity) {
            console.warn('Insufficient stock');
            return;
          }

          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.productId === productId) {
              // Check stock
              if (quantity > item.stockQuantity) {
                console.warn('Insufficient stock');
                return item;
              }
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.salePrice || item.price;
          return total + price * item.quantity;
        }, 0);
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        return subtotal * 0.1; // 10% tax
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        // Free shipping over $50
        return subtotal > 50 ? 0 : 5.99;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
