import { useVillage } from '../store/useVillageStore';
import { useState } from 'react';
import { ShoppingBag, Phone, MapPin, Search, X } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  kuliner: 'Kuliner',
  kerajinan: 'Kerajinan',
  pertanian: 'Pertanian',
  peternakan: 'Peternakan',
  lainnya: 'Lainnya',
};

const categoryColors: Record<string, string> = {
  kuliner: 'bg-rose-100 text-rose-700',
  kerajinan: 'bg-amber-100 text-amber-700',
  pertanian: 'bg-emerald-100 text-emerald-700',
  peternakan: 'bg-blue-100 text-blue-700',
  lainnya: 'bg-neutral-100 text-neutral-700',
};

export default function UMKMPage() {
  const { products } = useVillage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.is_available;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Lapak Desa UMKM</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Produk lokal dan hasil usaha warga desa yang layak dikunjungi dan dibeli
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Cari produk atau penjual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                !selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-600 hover:bg-primary-50'
              }`}
            >
              Semua
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-primary-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card-hover text-left"
            >
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 relative">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="text-primary-400" size={48} />
                  </div>
                )}
                <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[product.category]}`}>
                  {categoryLabels[product.category]}
                </span>
                {product.is_featured && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500 text-white">
                    Unggulan
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-primary-700 text-lg">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="pt-3 border-t border-neutral-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-500">Penjual:</p>
                    <p className="text-xs font-semibold text-neutral-700">{product.seller_name}</p>
                  </div>
                  <a
                    href={`https://wa.me/${product.seller_phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary w-full text-sm py-2"
                  >
                    <Phone size={16} />
                    Hubungi
                  </a>
                  <p className="text-xs text-neutral-400 flex items-center gap-1 justify-center">
                    <MapPin size={12} />
                    {product.seller_address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="text-neutral-300 mx-auto mb-4" size={48} />
            <p className="text-neutral-500">Tidak ada produk yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
