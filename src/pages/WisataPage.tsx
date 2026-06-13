import { useVillage } from '../store/useVillageStore';
import { useState } from 'react';
import { MapPin, Clock, Ticket, Search, X } from 'lucide-react';

export default function WisataPage() {
  const { tourismSpots } = useVillage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);

  const filteredSpots = tourismSpots.filter((spot) =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number | null) => {
    if (!price) return 'Gratis';
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Wisata Desa</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Temukan destinasi wisata alam dan budaya yang menarik di desa kami
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Cari destinasi wisata..."
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              className={`card-hover text-left overflow-hidden cursor-pointer ${
                selectedSpot === spot.id ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => setSelectedSpot(selectedSpot === spot.id ? null : spot.id)}
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-primary-200 to-primary-300 relative overflow-hidden">
                {spot.image_url ? (
                  <img
                    src={spot.image_url}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="text-primary-500" size={48} />
                  </div>
                )}
                {spot.is_featured && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500 text-white">
                    Populer
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 mb-2">{spot.name}</h3>
                <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                  {spot.description}
                </p>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary-500" />
                    <span className="line-clamp-1">{spot.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-primary-500" />
                    <span>{spot.opening_hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket size={14} className="text-primary-500" />
                    <span>Tiket: {formatPrice(spot.ticket_price)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSpots.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="text-neutral-300 mx-auto mb-4" size={48} />
            <p className="text-neutral-500">Tidak ada destinasi wisata yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
