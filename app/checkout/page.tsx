'use client';

  import { useState, useEffect } from 'react';
  import { useStore } from '@/store/useStore';
  import { useRouter } from 'next/navigation';
  import { db } from '@/lib/firebase';
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
  import { ShoppingBag } from 'lucide-react';
  
  export default function CheckoutPage() {
    const { cart, clearCart } = useStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
  
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
  
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
    useEffect(() => {
      setMounted(true);
      if (cart.length === 0) {
        router.push('/carrinho');
      }
    }, [cart.length, router]);
  
    if (!mounted || cart.length === 0) {
      return null;
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save order to Firebase
      const orderRef = await addDoc(collection(db, 'orders'), {
        customerName: name,
        customerPhone: phone,
        customerEmail: email || null,
        items: cart,
        totalAmount: total,
        status: 'new',
        createdAt: serverTimestamp()
      });

      // 2. Generate WhatsApp link
      const storePhone = '5571991044482'; // From prompt (71) 991044482
      
      let message = `Olá! Meu nome é ${name} e gostaria de finalizar meu pedido (ID: ${orderRef.id.slice(-6).toUpperCase()}):\n\n`;
      cart.forEach(item => {
        message += `- ${item.quantity}x ${item.name} ${item.variation ? `(${item.variation})` : ''} = R$ ${(item.price * item.quantity).toFixed(2)}\n`;
      });
      message += `\n*Total: R$ ${total.toFixed(2)}*\n\n`;
      message += `Por favor, me informe como proceder com o pagamento.`;

      const waLink = `https://wa.me/${storePhone}?text=${encodeURIComponent(message)}`;

      // 3. Clear cart & redirect
      clearCart();
      window.location.href = waLink;
      
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Houve um erro ao processar seu pedido. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-8 pb-6 border-b border-gray-100">
          <ShoppingBag className="w-8 h-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Finalizar Pedido</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo *</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">WhatsApp *</label>
            <input
              type="tel"
              id="phone"
              required
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail (opcional)</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-8">
            <span className="font-medium text-gray-700">Total a pagar:</span>
            <span className="text-xl font-bold text-gray-900">R$ {total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Enviar Pedido pelo WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
}
