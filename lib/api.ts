import { INITIAL_PRODUCTS, Product } from './initialData';

const PRODUCTS_STORAGE_KEY = 'paranhos_products_db';
const ORDERS_STORAGE_KEY = 'paranhos_orders_db';

function getLocalProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

function saveLocalProducts(products: Product[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving local products:', err);
  }
}

export const getProducts = async (filters?: { category?: string, isLaunch?: boolean, isHighlight?: boolean }) => {
  let list = getLocalProducts();
  
  if (filters) {
    if (filters.category) {
      const cat = filters.category.toLowerCase();
      list = list.filter(p => p.categories?.some(c => c.toLowerCase() === cat));
    }
    if (filters.isLaunch) {
      list = list.filter(p => p.isLaunch);
    }
    if (filters.isHighlight) {
      list = list.filter(p => p.isHighlight);
    }
  }

  return list;
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const list = getLocalProducts();
  const product = list.find(p => String(p.id) === String(id));
  return product || list[0] || null;
};

export const addProduct = async (data: any) => {
  const list = getLocalProducts();
  const newProduct: Product = {
    id: Date.now().toString(),
    rating: 5.0,
    images: data.images?.length ? data.images : ['https://picsum.photos/600'],
    ...data,
  };
  const updated = [newProduct, ...list];
  saveLocalProducts(updated);
  return newProduct;
};

export const updateProduct = async (id: string, data: any) => {
  const list = getLocalProducts();
  const updated = list.map(p => String(p.id) === String(id) ? { ...p, ...data } : p);
  saveLocalProducts(updated);
  return { id, ...data };
};

export const deleteProduct = async (id: string) => {
  const list = getLocalProducts();
  const updated = list.filter(p => String(p.id) !== String(id));
  saveLocalProducts(updated);
};

export const getOrders = async () => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(ORDERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveOrder = async (orderData: any) => {
  const orders = await getOrders();
  const newOrder = {
    id: 'PED-' + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toISOString(),
    status: 'new',
    ...orderData
  };
  const updated = [newOrder, ...orders];
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  }
  return newOrder;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const orders = await getOrders();
  const updated = orders.map((o: any) => o.id === id ? { ...o, status } : o);
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  }
  return { id, status };
};
