import { useVillage } from '../store/useVillageStore';
import { Calendar, ArrowRight, Clock } from 'lucide-react';

interface LatestNewsProps {
  onNavigate: (page: string) => void;
}

const categoryLabels: Record<string, string> = {
  berita: 'Berita',
  pengumuman: 'Pengumuman',
  kegiatan: 'Kegiatan',
};

const categoryColors: Record<string, string> = {
  berita: 'bg-blue-100 text-blue-700',
  pengumuman: 'bg-amber-100 text-amber-700',
  kegiatan: 'bg-emerald-100 text-emerald-700',
};

export default function LatestNews({ onNavigate }: LatestNewsProps) {
  const { news } = useVillage();
  const featuredNews = news.filter(n => n.is_featured).slice(0, 3);
  const otherNews = news.filter(n => !n.is_featured).slice(0, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleNewsClick = () => {
    onNavigate('berita');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="section-title mb-2">Berita & Pengumuman</h2>
            <p className="text-neutral-500">
              Informasi terkini seputar kegiatan dan program desa
            </p>
          </div>
          <button
            onClick={handleNewsClick}
            className="btn btn-secondary"
          >
            Lihat Semua
            <ArrowRight size={18} />
          </button>
        </div>

        {featuredNews.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <button
              onClick={handleNewsClick}
              className="card-hover text-left group lg:row-span-2"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-primary-200 to-primary-300 relative overflow-hidden">
                {featuredNews[0].image_url ? (
                  <img
                    src={featuredNews[0].image_url}
                    alt={featuredNews[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="text-primary-500" size={64} />
                  </div>
                )}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${categoryColors[featuredNews[0].category]}`}>
                  {categoryLabels[featuredNews[0].category]}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(featuredNews[0].published_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {featuredNews[0].views} dilihat
                  </span>
                </div>
                <h3 className="font-bold text-xl text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {featuredNews[0].title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  {featuredNews[0].excerpt}
                </p>
              </div>
            </button>

            <div className="space-y-4">
              {featuredNews.slice(1, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={handleNewsClick}
                  className="card-hover text-left group flex gap-4 p-4"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex-shrink-0 relative overflow-hidden">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="text-primary-500" size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${categoryColors[item.category]}`}>
                      {categoryLabels[item.category]}
                    </span>
                    <h4 className="font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(item.published_at)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherNews.map((item) => (
            <button
              key={item.id}
              onClick={handleNewsClick}
              className="card-hover text-left group"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-primary-200 to-primary-300 relative overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="text-primary-500" size={40} />
                  </div>
                )}
                <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>
                  {categoryLabels[item.category]}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-sm text-neutral-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(item.published_at)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
