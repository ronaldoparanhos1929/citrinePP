'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProduct } from '@/lib/api';
import { useStore } from '@/store/useStore';
import { ShoppingCart, Star, Check, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailView() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || '1';
  const addToCart = useStore((state) => state.addToCart);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      let p: any = null;
      try {
        p = await getProduct(id);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
      
      if (!p) {
        // Mock fallback for preview if not in db
        p = {
          id,
          name: id === '1' ? 'Caneca Mágica Personalizada' :
                id === '2' ? 'Kit Camiseta + Almofada Dia dos Namorados' :
                id === '3' ? 'Squeeze de Alumínio 600ml' :
                id === '4' ? 'Brindes Corporativos (100 un)' : 'Produto Personalizado',
          description: 'Uma descrição detalhada do produto, informando o material de alta qualidade, opções de personalização exclusivas e dicas de cuidado.',
          priceType: 'fixed',
          price: 45.0,
          images: [
            `https://picsum.photos/seed/${id}1/600/600`,
            `https://picsum.photos/seed/${id}2/600/600`,
            `https://picsum.photos/seed/${id}3/600/600`
          ], 
          rating: 4.9, 
          variations: ['Padrão', 'Personalizado'],
          isLaunch: false
        };
      }
      setProduct(p);
      setMainImage(p.images?.[0] || 'https://picsum.photos/600');
      if (p.variations && p.variations.length > 0) {
        setSelectedVariation(p.variations[0]);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.priceType === 'promotional' ? product.promotionalPrice : product.price,
      quantity,
      image: product.images?.[0] || 'https://picsum.photos/400',
      variation: selectedVariation
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Carregando produto...</div>;
  }
  if (!product) {
    return <div className="min-h-[60vh] flex items-center justify-center">Produto não encontrado.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/produtos" className="inline-flex items-center text-gray-500 hover:text-primary mb-6">
        <ChevronLeft className="w-4 h-4 mr-1" /> Voltar para produtos
      </Link>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Galeria */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 origin-center" 
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(Math.floor(product.rating || 5))].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="text-gray-500 text-sm">({product.rating || 5.0} avaliações)</span>
          </div>

          <div className="mb-8">
            {product.priceType === 'promotional' && product.promotionalPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through text-lg">R$ {product.price.toFixed(2)}</span>
                <span className="text-red-600 font-bold text-4xl">R$ {product.promotionalPrice.toFixed(2)}</span>
              </div>
            ) : product.priceType === 'fixed' || product.priceType === 'starting_at' ? (
              <div className="flex items-baseline space-x-2">
                {product.priceType === 'starting_at' && <span className="text-gray-500 text-lg">A partir de</span>}
                <span className="text-gray-900 font-bold text-4xl">R$ {product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-primary font-bold text-2xl">Preço a combinar</span>
            )}
          </div>

          <div className="prose text-gray-600 mb-8 max-w-none">
            <p>{product.description}</p>
          </div>

          {product.variations && product.variations.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tamanho / Variação</h3>
              <div className="flex flex-wrap gap-2">
                {product.variations.map((v: string) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariation(v)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedVariation === v 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 flex items-center space-x-4">
            <h3 className="text-sm font-medium text-gray-900">Quantidade</h3>
            <div className="flex items-center border border-gray-200 rounded-md">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-50"
              >-</button>
              <span className="px-4 py-1 text-gray-900 font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-50"
              >+</button>
            </div>
          </div>

          <div className="mt-auto flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 flex items-center justify-center px-8 py-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white transition-colors ${
                added ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'
              }`}
            >
              {added ? (
                <><Check className="mr-2 h-5 w-5" /> Adicionado</>
              ) : (
                <><ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho</>
              )}
            </button>
            <button
              onClick={() => {
                handleAddToCart();
                router.push('/carrinho');
              }}
              className="flex-1 flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-xl shadow-sm text-base font-medium bg-white hover:bg-primary/5 transition-colors"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
