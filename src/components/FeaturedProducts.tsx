import { useVillage } from '../store/useVillageStore';
import { ShoppingBag, ArrowRight, Phone, MapPin } from 'lucide-react';

interface FeaturedProductsProps {
  onNavigate: (page: string) => void;
}

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

export default function FeaturedProducts({ onNavigate }: FeaturedProductsProps) {
  const { products } = useVillage();
  const featuredProducts = products.filter(p => p.is_featured).slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="section-title mb-2">Produk Unggulan UMKM</h2>
            <p className="text-neutral-500">
              Dukung produk lokal dari usaha warga desa kami
            </p>
          </div>
          <button
            onClick={() => onNavigate('umkm')}
            className="btn btn-secondary"
          >
            Lihat Semua
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="card-hover text-left group"
            >
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="text-primary-400" size={48} />
                  </div>
                )}
                <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[product.category]}`}>
                  {categoryLabels[product.category]}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-neutral-900 mb-1 line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary-700">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-neutral-500 flex items-center gap-1">
                    <MapPin size={12} />
                    {product.seller_address.slice(0, 20)}...
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-neutral-400" />
                    <span className="text-sm text-neutral-600">{product.seller_phone}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">Penjual: {product.seller_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
