'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api';
import Link from 'next/link';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  if (loading) return <div>Carregando produtos...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Produtos</h1>
        <Link 
          href="/admin/produtos/novo"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium"
        >
          + Novo Produto
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destaque/Novo</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-md object-cover" src={product.images?.[0] || 'https://picsum.photos/40'} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.priceType === 'fixed' ? 'Fixo' : product.priceType === 'promotional' ? 'Promocional' : product.priceType === 'starting_at' ? 'A partir de' : 'A combinar'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.priceType === 'on_request' ? '-' : `R$ ${product.price?.toFixed(2)}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  {product.isHighlight && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Destaque</span>}
                  {product.isLaunch && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Novo</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* <Link href={`/admin/produtos/${product.id}`} className="text-primary hover:text-primary/80">Editar</Link> */}
                  <span className="text-gray-400 cursor-not-allowed ml-4">Excluir</span>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Nenhum produto cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
