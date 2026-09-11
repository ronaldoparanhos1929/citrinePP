import { create } from 'zustand';
import { User } from 'firebase/auth';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variation?: string;
};

interface StoreState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variation?: string) => void;
  updateQuantity: (id: string, quantity: number, variation?: string) => void;
  clearCart: () => void;
  
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (i) => i.id === item.id && i.variation === item.variation
      );
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id && i.variation === item.variation
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (id, variation) =>
    set((state) => ({
      cart: state.cart.filter(
        (i) => !(i.id === id && i.variation === variation)
      ),
    })),
  updateQuantity: (id, quantity, variation) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id && i.variation === variation ? { ...i, quantity } : i
      ),
    })),
  clearCart: () => set({ cart: [] }),
  
  user: null,
  setUser: (user) => set({ user }),
}));
