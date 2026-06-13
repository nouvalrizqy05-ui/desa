import { useVillage } from '../store/useVillageStore';
import { Users, Home, School, Heart, Building, Church } from 'lucide-react';

export default function StatistikPage() {
  const { villageInfo, statistics } = useVillage();

  const statsData = [
    { icon: Users, label: 'Penduduk Laki-laki', value: statistics?.population_male?.toLocaleString() || '1,785', color: 'from-blue-500 to-blue-600' },
    { icon: Users, label: 'Penduduk Perempuan', value: statistics?.population_female?.toLocaleString() || '1,715', color: 'from-rose-500 to-rose-600' },
    { icon: Home, label: 'Kepala Keluarga', value: statistics?.family_count?.toLocaleString() || '850', color: 'from-emerald-500 to-emerald-600' },
    { icon: Building, label: 'Jumlah RT', value: statistics?.rt_count?.toString() || '12', color: 'from-amber-500 to-amber-600' },
    { icon: Building, label: 'Jumlah RW', value: statistics?.rw_count?.toString() || '5', color: 'from-cyan-500 to-cyan-600' },
    { icon: Home, label: 'Jumlah Rumah', value: statistics?.houses_count?.toLocaleString() || '875', color: 'from-violet-500 to-violet-600' },
    { icon: School, label: 'Sekolah', value: statistics?.schools_count?.toString() || '3', color: 'from-indigo-500 to-indigo-600' },
    { icon: Heart, label: 'Fasilitas Kesehatan', value: statistics?.health_facilities_count?.toString() || '1', color: 'from-red-500 to-red-600' },
    { icon: Church, label: 'Tempat Ibadah', value: statistics?.worship_places_count?.toString() || '6', color: 'from-teal-500 to-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Statistik Desa</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Data dan statistik kependudukan {villageInfo?.name} tahun {statistics?.year || '2024'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 flex items-center gap-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <stat.icon className="text-white" size={26} />
              </div>
              <div>
                <p className="text-sm text-neutral-500">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Distribusi Penduduk</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-neutral-100 rounded-full h-8 overflow-hidden flex">
              <div
                className="bg-blue-500 h-full flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${((statistics?.population_male || 1785) / (statistics?.population_total || 3500)) * 100}%` }}
              >
                Laki-laki
              </div>
              <div
                className="bg-rose-500 h-full flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${((statistics?.population_female || 1715) / (statistics?.population_total || 3500)) * 100}%` }}
              >
                Perempuan
              </div>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-neutral-600">Laki-laki: {statistics?.population_male?.toLocaleString() || '1,785'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
              <span className="text-sm text-neutral-600">Perempuan: {statistics?.population_female?.toLocaleString() || '1,715'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
