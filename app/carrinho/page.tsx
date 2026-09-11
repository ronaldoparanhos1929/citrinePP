'use client';

import { useStore } from '@/store/useStore';
import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Seu Carrinho está Vazio</h1>
        <p className="text-gray-500 mb-8">Parece que você ainda não adicionou nada ao carrinho.</p>
        <Link href="/produtos" className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors">
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={`${item.id}-${item.variation}`} className="flex py-6 border-b border-gray-200">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link href={`/produtos/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="ml-4">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  {item.variation && <p className="mt-1 text-sm text-gray-500">{item.variation}</p>}
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variation)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                    >-</button>
                    <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.variation)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                    >+</button>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.variation)}
                      className="font-medium text-red-600 hover:text-red-500 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remover
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl h-fit">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Resumo do Pedido</h2>
          <div className="flow-root">
            <dl className="-my-4 divide-y divide-gray-200 text-sm">
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">R$ {total.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Frete</dt>
                <dd className="font-medium text-gray-900">A combinar</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-base font-bold text-gray-900">Total</dt>
                <dd className="text-base font-bold text-gray-900">R$ {total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-6">
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              Finalizar Compra <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
