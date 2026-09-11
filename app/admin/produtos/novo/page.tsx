'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct } from '@/lib/api';

export default function NovoProduto() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceType: 'fixed',
    price: 0,
    promotionalPrice: 0,
    images: 'https://picsum.photos/seed/novo/600/600', // Mock upload
    variations: '',
    isLaunch: false,
    isHighlight: false,
    brand: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSave = {
        ...formData,
        price: Number(formData.price),
        promotionalPrice: Number(formData.promotionalPrice),
        images: [formData.images], // Basic array format for images
        variations: formData.variations.split(',').map(v => v.trim()).filter(Boolean),
        rating: 5,
        categories: []
      };
      
      await addProduct(dataToSave);
      router.push('/admin/produtos');
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cadastrar Novo Produto</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição Detalhada</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Preço</label>
            <select
              value={formData.priceType}
              onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
            >
              <option value="fixed">Preço Fixo</option>
              <option value="starting_at">Preço A Partir de</option>
              <option value="promotional">Promoção</option>
              <option value="on_request">A Combinar (Esconder preço)</option>
            </select>
          </div>
          
          {formData.priceType !== 'on_request' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {formData.priceType === 'promotional' ? 'Preço Original' : 'Preço'} (R$)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
              />
            </div>
          )}
        </div>

        {formData.priceType === 'promotional' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço Promocional (R$)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.promotionalPrice}
              onChange={(e) => setFormData({ ...formData, promotionalPrice: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Variações (Tamanhos/Cores)</label>
          <input
            type="text"
            placeholder="Ex: P, M, G, GG ou Azul, Vermelho"
            value={formData.variations}
            onChange={(e) => setFormData({ ...formData, variations: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
          />
          <p className="mt-1 text-xs text-gray-500">Separe as opções por vírgula.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">URL da Imagem (Provisório para testes)</label>
          <input
            type="url"
            value={formData.images}
            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
          />
        </div>

        <div className="flex space-x-6">
          <div className="flex items-center">
            <input
              id="isLaunch"
              type="checkbox"
              checked={formData.isLaunch}
              onChange={(e) => setFormData({ ...formData, isLaunch: e.target.checked })}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="isLaunch" className="ml-2 block text-sm text-gray-900">
              Marcar como Novo / Lançamento
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="isHighlight"
              type="checkbox"
              checked={formData.isHighlight}
              onChange={(e) => setFormData({ ...formData, isHighlight: e.target.checked })}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="isHighlight" className="ml-2 block text-sm text-gray-900">
              Destaque na Tela Inicial
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-3"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
}
