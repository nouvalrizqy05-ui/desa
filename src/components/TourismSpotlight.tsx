import { useVillage } from '../store/useVillageStore';
import { MapPin, Clock, Ticket, ArrowRight } from 'lucide-react';

interface TourismSpotlightProps {
  onNavigate: (page: string) => void;
}

export default function TourismSpotlight({ onNavigate }: TourismSpotlightProps) {
  const { tourismSpots } = useVillage();
  const featuredSpots = tourismSpots.filter(s => s.is_featured).slice(0, 2);

  const formatPrice = (price: number | null) => {
    if (!price) return 'Gratis';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="section-title mb-2">Destinasi Wisata</h2>
            <p className="text-neutral-500">
              Keindahan alam dan budaya yang layak dikunjungi di desa kami
            </p>
          </div>
          <button
            onClick={() => onNavigate('wisata')}
            className="btn btn-secondary"
          >
            Lihat Semua
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {featuredSpots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => onNavigate('wisata')}
              className="card-hover text-left group overflow-hidden"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-primary-200 to-primary-300 relative overflow-hidden">
                {spot.image_url ? (
                  <img
                    src={spot.image_url}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="text-primary-500" size={64} />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white font-bold text-2xl mb-2">
                    {spot.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4 line-clamp-2">
                  {spot.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary-500" />
                    {spot.address}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-primary-500" />
                    {spot.opening_hours}
                  </span>
                  {spot.ticket_price !== null && (
                    <span className="flex items-center gap-2">
                      <Ticket size={16} className="text-primary-500" />
                      Tiket: {formatPrice(spot.ticket_price)}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
