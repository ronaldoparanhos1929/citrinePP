'use client';

import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Package } from 'lucide-react';
import { auth } from '@/lib/firebase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [setUser, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando painel...</div>;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link href="/admin/pedidos" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <ShoppingBag className="w-5 h-5 mr-3" /> Pedidos
          </Link>
          <Link href="/admin/produtos" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Package className="w-5 h-5 mr-3" /> Produtos
          </Link>
          <Link href="/admin/configuracoes" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Settings className="w-5 h-5 mr-3" /> Configurações
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={() => auth.signOut()}
            className="flex items-center w-full px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" /> Sair
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
