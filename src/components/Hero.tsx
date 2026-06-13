import { useVillage } from '../store/useVillageStore';
import { ArrowRight, FileText, Building2, Users, TrendingUp } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { villageInfo, statistics } = useVillage();

  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70"></div>

      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path fill="currentColor" className="text-white" d="M45.7,-57.2C59.5,-48.3,71.1,-33.6,75.4,-16.5C79.6,0.6,76.5,20.1,66.9,35.1C57.3,50.1,41.2,60.6,23.4,66.5C5.6,72.4,-13.9,73.7,-31.6,68C-49.3,62.4,-65.2,49.8,-73.5,32.9C-81.8,16,-82.5,-5.1,-75.3,-22.2C-68.1,-39.3,-53,-52.4,-37.5,-60.9C-22,-69.4,-6,-73.4,8.9,-74.1C23.8,-74.8,31.9,-66.1,45.7,-57.2Z" transform="translate(100 100)"></path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 size={16} />
              Portal Resmi Pemerintah Desa
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Selamat Datang di<br />
              <span className="text-accent-400">{villageInfo?.name || 'Desa Sukamaju'}</span>
            </h1>

            <p className="text-lg text-primary-100 mb-8 leading-relaxed max-w-xl">
              {villageInfo?.vision || 'Mewujudkan desa yang maju, mandiri, dan sejahtera untuk kesejahteraan seluruh warga'}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('layanan')}
                className="btn bg-white text-primary-700 hover:bg-primary-50 shadow-lg shadow-primary-900/30"
              >
                <FileText size={18} />
                Layanan Surat Online
              </button>
              <button
                onClick={() => onNavigate('profil')}
                className="btn border-2 border-white/30 text-white hover:bg-white/10"
              >
                Tentang Desa
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10 hover:bg-white/20 transition-all duration-300">
              <Users className="text-accent-400 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">
                {statistics?.population_total?.toLocaleString() || villageInfo?.population_total?.toLocaleString() || '3,500'}
              </div>
              <div className="text-primary-200 text-sm">Jumlah Penduduk</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10 hover:bg-white/20 transition-all duration-300">
              <Users className="text-accent-400 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">
                {statistics?.family_count?.toLocaleString() || villageInfo?.family_total?.toLocaleString() || '850'}
              </div>
              <div className="text-primary-200 text-sm">Kepala Keluarga</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10 hover:bg-white/20 transition-all duration-300">
              <TrendingUp className="text-accent-400 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">
                {villageInfo?.area_hectares?.toLocaleString() || '250'}
              </div>
              <div className="text-primary-200 text-sm">Hektar Luas Wilayah</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10 hover:bg-white/20 transition-all duration-300">
              <Building2 className="text-accent-400 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">
                {statistics?.rt_count || '12'} RT / {statistics?.rw_count || '5'} RW
              </div>
              <div className="text-primary-200 text-sm">Wilayah Administratif</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
