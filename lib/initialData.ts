export interface Product {
  id: string;
  name: string;
  description: string;
  priceType: 'fixed' | 'promotional' | 'starting_at' | 'on_request';
  price: number;
  promotionalPrice?: number;
  categories: string[];
  images: string[];
  rating: number;
  isHighlight?: boolean;
  isLaunch?: boolean;
  variations?: string[];
  affiliateUrl?: string;
  whatsappMessage?: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Caneca Mágica Termossensível Personalizada',
    description: 'Caneca mágica de cerâmica preta que revela a arte personalizada ao receber líquido quente. Capacidade de 325ml, acabamento brilhante e alta durabilidade.',
    priceType: 'promotional',
    price: 49.90,
    promotionalPrice: 39.90,
    categories: ['canecas', 'kits'],
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 5.0,
    isHighlight: true,
    isLaunch: true,
    variations: ['Preto Fosco (Revela Arte)', 'Preto Brilhante', 'Azul Escuro']
  },
  {
    id: '2',
    name: 'Kit Presente: Camiseta 100% Algodão + Almofada 40x40',
    description: 'Kit especial personalizável com fotos, frases e estampas exclusivas. Acompanha camiseta macia e confortável com estampa em alta resolução e almofada com enchimento antialérgico.',
    priceType: 'promotional',
    price: 139.90,
    promotionalPrice: 109.90,
    categories: ['kits', 'camisas', 'almofadas'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.9,
    isHighlight: true,
    isLaunch: false,
    variations: ['Tamanho P', 'Tamanho M', 'Tamanho G', 'Tamanho GG']
  },
  {
    id: '3',
    name: 'Squeeze Térmico de Alumínio 600ml com Mosquetão',
    description: 'Garrafa squeeze de alumínio leve e resistente, ideal para academia, trabalho ou passeios. Personalização resistente à água e lavagens.',
    priceType: 'fixed',
    price: 34.90,
    categories: ['brindes', 'canecas'],
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    isHighlight: false,
    isLaunch: true,
    variations: ['Branco Brilhante', 'Prata Alumínio']
  },
  {
    id: '4',
    name: 'Azulejo Decorativo Personalizado com Suporte de Mesa (15x15 cm)',
    description: 'Azulejo de cerâmica esmaltada de alto brilho com foto ou frase personalizada. Acompanha suporte discreto para mesa, estante ou nicho.',
    priceType: 'fixed',
    price: 29.90,
    categories: ['kits', 'brindes'],
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 5.0,
    isHighlight: true,
    isLaunch: false,
    variations: ['15x15 cm com Suporte', '20x20 cm com Suporte']
  },
  {
    id: '5',
    name: 'Camisa Poliéster Sublimação Total - Alta Definição',
    description: 'Camiseta leve e fresca em tecido especial para sublimação. Cores vivas que não desbotam, não racham e não soltam tinta ao lavar.',
    priceType: 'fixed',
    price: 45.00,
    categories: ['camisas'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.7,
    isHighlight: false,
    isLaunch: false,
    variations: ['Infantil', 'Adulto P', 'Adulto M', 'Adulto G', 'Adulto GG']
  },
  {
    id: '6',
    name: 'Copo Térmico Personalizado com Tampa e Abridor 473ml',
    description: 'Copo térmico de parede dupla com isolamento a vácuo, mantém a bebida gelada por até 4 horas. Gravação permanente personalizada.',
    priceType: 'promotional',
    price: 79.90,
    promotionalPrice: 59.90,
    categories: ['brindes', 'canecas'],
    images: [
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.9,
    isHighlight: true,
    isLaunch: true,
    variations: ['Preto Fosco', 'Branco Pérola', 'Azul Marinho', 'Rosa']
  },
  {
    id: '7',
    name: 'Almofada Personalizada Foto e Mensagem 40x40cm',
    description: 'Almofada decorativa em tecido Oxford macio, com zíper invisível para fácil lavagem e enchimento de fibra siliconada antialérgica.',
    priceType: 'fixed',
    price: 38.00,
    categories: ['almofadas'],
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 4.8,
    isHighlight: false,
    isLaunch: false,
    variations: ['Quadrada 40x40cm', 'Coração 35x35cm']
  },
  {
    id: '8',
    name: 'Kit Corporativo / Brindes para Empresas (Grandes Quantidades)',
    description: 'Produzimos kits corporativos, chaveiros, canecas, squeezes e uniformes para a sua empresa ou evento. Orçamento sob medida e entrega rápida.',
    priceType: 'on_request',
    price: 0,
    categories: ['brindes'],
    images: [
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80'
    ],
    rating: 5.0,
    isHighlight: false,
    isLaunch: false,
    variations: ['Orçamento pelo WhatsApp']
  }
];
