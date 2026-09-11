'use client';

import { useEffect, useState, Suspense } from 'react';
import { getProducts } from '@/lib/api';
import Link from 'next/link';
import { Star, Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function ProductsList() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('categoria');

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Simple client-side filtering for preview
  const filteredProducts = products.filter(p => {
    if (categoryParam) {
      return p.categories?.includes(categoryParam) || p.name.toLowerCase().includes(categoryParam.toLowerCase());
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {categoryParam ? `Resultados para "${categoryParam}"` : 'Todos os Produtos'}
          </h1>
          <p className="text-gray-500 mt-2">Encontre as melhores opções personalizadas.</p>
        </div>
        <button className="flex items-center space-x-2 border rounded-lg px-4 py-2 hover:bg-gray-50 text-gray-700">
          <Filter className="w-5 h-5" /> <span>Filtros</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center">Carregando produtos...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">Nenhum produto encontrado.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/produtos/${product.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
              <div className="relative aspect-square bg-gray-100">
                <img src={product.images?.[0] || 'https://picsum.photos/400'} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                {product.isLaunch && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Novo</span>
                )}
                {product.isHighlight && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">Destaque</span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(Math.floor(product.rating || 5))].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  <span className="text-gray-500 text-xs ml-1">{product.rating || 5.0}</span>
                </div>
                <div className="mt-auto pt-2">
                  {product.priceType === 'promotional' && product.promotionalPrice ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 line-through text-sm">R$ {product.price.toFixed(2)}</span>
                      <span className="text-red-600 font-bold text-lg">R$ {product.promotionalPrice.toFixed(2)}</span>
                    </div>
                  ) : product.priceType === 'fixed' ? (
                    <span className="text-gray-900 font-bold text-lg">R$ {product.price.toFixed(2)}</span>
                  ) : product.priceType === 'starting_at' ? (
                    <span className="text-gray-900 font-bold text-lg">A partir de R$ {product.price.toFixed(2)}</span>
                  ) : (
                    <span className="text-primary font-bold text-lg">Preço a combinar</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Carregando loja...</div>}>
      <ProductsList />
    </Suspense>
  );
}
