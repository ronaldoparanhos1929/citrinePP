'use client';

export default function AdminSettings() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações da Loja</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Loja</label>
          <input
            type="text"
            defaultValue="Paranhos Personalizados"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone WhatsApp</label>
          <input
            type="text"
            defaultValue="(71) 99104-4482"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Cor Principal (Hex)</label>
          <div className="mt-1 flex items-center space-x-2">
            <input
              type="color"
              defaultValue="#111827"
              className="h-10 w-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              defaultValue="#111827"
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            className="bg-primary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
}
