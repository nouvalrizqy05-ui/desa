import { useVillage } from '../store/useVillageStore';
import { useState } from 'react';
import { Calendar, Clock, Search, X } from 'lucide-react';

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

export default function BeritaPage() {
  const { news } = useVillage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Berita & Pengumuman</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Informasi terkini seputar kegiatan, program, dan pengumuman desa
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Cari berita..."
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
          <div className="flex gap-2">
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
            {['berita', 'pengumuman', 'kegiatan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-primary-50'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="card-hover text-left"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-primary-200 to-primary-300 relative overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
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
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(item.published_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {item.views} dilihat
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">Tidak ada berita yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
