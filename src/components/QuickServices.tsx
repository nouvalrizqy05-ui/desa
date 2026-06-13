import { FileText, Users, Landmark, ShoppingBag, MapPin, TrendingUp } from 'lucide-react';

interface QuickServicesProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    icon: FileText,
    title: 'Layanan Surat',
    description: 'Ajukan surat keterangan online tanpa antre di kantor desa',
    page: 'layanan',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Users,
    title: 'Profil Desa',
    description: 'Informasi lengkap tentang sejarah, visi misi, dan struktur organisasi',
    page: 'profil',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: TrendingUp,
    title: 'Transparansi APBDes',
    description: 'Laporan keuangan desa yang dapat diakses seluruh warga',
    page: 'transparansi',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: ShoppingBag,
    title: 'UMKM Desa',
    description: 'Produk lokal dan hasil usaha warga yang layak dibeli',
    page: 'umkm',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: MapPin,
    title: 'Wisata Desa',
    description: 'Destinasi wisata dan tempat menarik di desa kami',
    page: 'wisata',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Landmark,
    title: 'Berita & Pengumuman',
    description: 'Informasi terkini seputar kegiatan dan program desa',
    page: 'berita',
    color: 'from-violet-500 to-violet-600',
  },
];

export default function QuickServices({ onNavigate }: QuickServicesProps) {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Layanan Publik Desa</h2>
          <p className="section-subtitle">
            Nikmati kemudahan akses layanan desa secara online, transparan, dan profesional
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <button
              key={service.page}
              onClick={() => onNavigate(service.page)}
              className="card-hover p-6 text-left group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="text-white" size={26} />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
