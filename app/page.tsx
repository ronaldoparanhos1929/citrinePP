import Link from 'next/link';
import BannerCarousel from '@/components/ui/BannerCarousel';
import { ArrowRight, Star } from 'lucide-react';
import { getProducts } from '@/lib/api';

export default async function Home() {
  // Fetch real data from Firebase, or fallback to empty array if no data yet.
  let products: any[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Generate some mock products if database is empty for preview
  const previewProducts = products.length > 0 ? products : [
    {
      id: '1', name: 'Caneca Mágica Personalizada', priceType: 'fixed', price: 45.0,
      images: ['https://picsum.photos/seed/caneca/400/400'], rating: 5, isLaunch: true
    },
    {
      id: '2', name: 'Kit Camiseta + Almofada Dia dos Namorados', priceType: 'promotional', price: 120.0, promotionalPrice: 99.9,
      images: ['https://picsum.photos/seed/kit/400/400'], rating: 4.8, isHighlight: true
    },
    {
      id: '3', name: 'Squeeze de Alumínio 600ml', priceType: 'fixed', price: 35.0,
      images: ['https://picsum.photos/seed/squeeze/400/400'], rating: 4.5
    },
    {
      id: '4', name: 'Brindes Corporativos (100 un)', priceType: 'on_request',
      images: ['https://picsum.photos/seed/brindes/400/400'], rating: 5
    }
  ];

  const highlights = previewProducts.filter((p: any) => p.isHighlight || p.rating >= 4.8).slice(0, 4);
  const launches = previewProducts.filter((p: any) => p.isLaunch).slice(0, 4);

  const categories = [
    { id: 'canecas', name: 'Canecas', image: 'https://picsum.photos/seed/cat1/200/200' },
    { id: 'camisas', name: 'Camisas', image: 'https://picsum.photos/seed/cat2/200/200' },
    { id: 'kits', name: 'Kits Presente', image: 'https://picsum.photos/seed/cat3/200/200' },
    { id: 'almofadas', name: 'Almofadas', image: 'https://picsum.photos/seed/cat4/200/200' },
    { id: 'brindes', name: 'Brindes', image: 'https://picsum.photos/seed/cat5/200/200' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <section>
        <BannerCarousel />
      </section>

      {/* Categorias */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nossas Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/produtos?categoria=${cat.id}`} className="group text-center">
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-md mb-3 transition-transform group-hover:scale-105">
                <img src={cat.image} alt={cat.name} className="object-cover w-full h-full" />
              </div>
              <h3 className="font-medium text-gray-800 group-hover:text-primary transition-colors">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Destaques */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Destaques</h2>
          <Link href="/produtos" className="text-primary hover:underline font-medium flex items-center">
            Ver todos <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Lançamentos */}
      {launches.length > 0 && (
        <section className="bg-primary/5 rounded-2xl p-8 -mx-4 sm:mx-0">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Lançamentos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {launches.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Depoimentos */}
      <section className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Clientes Satisfeitos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Mariana S.", text: "As canecas ficaram lindas! A qualidade da impressão é perfeita.", rating: 5 },
            { name: "João P.", text: "Comprei camisas para a equipe da minha empresa e todos adoraram. Super recomendo!", rating: 5 },
            { name: "Carla T.", text: "O kit do Dia das Mães emocionou minha mãe. Atendimento nota 10.", rating: 5 },
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(testimonial.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/produtos/${product.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative aspect-square bg-gray-100">
        <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
        {product.isLaunch && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Novo</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex text-yellow-400 mb-2">
          <Star className="w-4 h-4 fill-current" />
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
  );
}
