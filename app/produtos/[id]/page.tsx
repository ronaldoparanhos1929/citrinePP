import ProductDetailView from '@/components/ProductDetailView';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default function ProductPage() {
  return <ProductDetailView />;
}
