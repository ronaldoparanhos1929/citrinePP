'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, UserCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

export default function Navbar() {
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const user = useStore((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-2xl text-primary">Paranhos Personalizados</span>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/produtos" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Produtos
            </Link>
            <Link href="/carrinho" className="text-gray-700 hover:text-primary relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-primary p-2">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex items-center sm:hidden space-x-4">
            <Link href="/carrinho" className="text-gray-700 hover:text-primary relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/produtos" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Produtos
            </Link>
            <Link href="/admin" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Painel Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
