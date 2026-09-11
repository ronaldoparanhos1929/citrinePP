'use client';

import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    await updateOrderStatus(id, newStatus);
    await fetchOrders();
    setUpdatingId(null);
  };

  const statusColors: Record<string, string> = {
    'new': 'bg-blue-100 text-blue-800',
    'in_progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'canceled': 'bg-red-100 text-red-800',
  };
  const statusNames: Record<string, string> = {
    'new': 'Novo',
    'in_progress': 'Em Atendimento',
    'completed': 'Concluído',
    'canceled': 'Cancelado',
  };

  if (loading) return <div>Carregando pedidos...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Pedidos</h1>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.id.slice(-6).toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.customerPhone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {order.totalAmount?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`text-xs font-semibold rounded-full px-3 py-1 border-0 cursor-pointer ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}
                  >
                    <option value="new">Novo</option>
                    <option value="in_progress">Em Atendimento</option>
                    <option value="completed">Concluído</option>
                    <option value="canceled">Cancelado</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a
                    href={`https://wa.me/55${order.customerPhone.replace(/\\D/g, '')}?text=Olá ${order.customerName}, sobre o seu pedido ${order.id.slice(-6).toUpperCase()}...`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 hover:text-green-900"
                  >
                    Chamar no WhatsApp
                  </a>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Nenhum pedido encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
