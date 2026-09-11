'use client';

import { useEffect, useState } from 'react';
import { getOrders, getProducts } from '@/lib/api';
import { Package, ShoppingBag, DollarSign, Activity } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    revenue: 0,
    newOrders: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orders, products] = await Promise.all([
          getOrders(),
          getProducts()
        ]);
        
        const totalRevenue = orders.reduce((sum, order: any) => sum + (order.totalAmount || 0), 0);
        const newOrders = orders.filter((o: any) => o.status === 'new').length;

        setStats({
          totalOrders: orders.length,
          totalProducts: products.length,
          revenue: totalRevenue,
          newOrders
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <div>Carregando dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Resumo da Loja</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-lg mr-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total de Pedidos</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-yellow-100 text-yellow-600 rounded-lg mr-4">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pedidos Novos</p>
            <p className="text-2xl font-bold text-gray-900">{stats.newOrders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-green-100 text-green-600 rounded-lg mr-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Receita Bruta</p>
            <p className="text-2xl font-bold text-gray-900">R$ {stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-lg mr-4">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Produtos Cadastrados</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="space-y-4">
            <Link href="/admin/produtos/novo" className="block w-full py-3 px-4 text-center border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
              + Cadastrar Novo Produto
            </Link>
            <Link href="/admin/pedidos" className="block w-full py-3 px-4 text-center border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
              Ver Todos os Pedidos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
