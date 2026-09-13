import ProductDetailView from '@/components/ProductDetailView';
import { INITIAL_PRODUCTS } from '@/lib/initialData';

export async function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export default function ProductPage() {
  return <ProductDetailView />;
}
