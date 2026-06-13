import { useVillage } from '../store/useVillageStore';
import { MapPin, Users, Building2, Calendar, FileText } from 'lucide-react';

export default function ProfilPage() {
  const { villageInfo, statistics } = useVillage();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Profil {villageInfo?.name}</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            {villageInfo?.subdistrict}, {villageInfo?.regency}, {villageInfo?.province}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="text-primary-600" size={24} />
            </div>
            <h3 className="font-bold text-neutral-900 mb-1">Luas Wilayah</h3>
            <p className="text-3xl font-bold text-primary-700">{villageInfo?.area_hectares?.toLocaleString() || '250'} Ha</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="text-primary-600" size={24} />
            </div>
            <h3 className="font-bold text-neutral-900 mb-1">Jumlah Penduduk</h3>
            <p className="text-3xl font-bold text-primary-700">{statistics?.population_total?.toLocaleString() || villageInfo?.population_total?.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="text-primary-600" size={24} />
            </div>
            <h3 className="font-bold text-neutral-900 mb-1">Kepala Keluarga</h3>
            <p className="text-3xl font-bold text-primary-700">{statistics?.family_count?.toLocaleString() || villageInfo?.family_total?.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-accent-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">Sejarah Desa</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              {villageInfo?.history}
            </p>
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <p className="text-sm text-neutral-500">Desa didirikan pada tahun <span className="font-semibold text-neutral-700">{villageInfo?.established_year}</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Statistik Desa</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500">Laki-laki</p>
                <p className="text-2xl font-bold text-neutral-900">{statistics?.population_male?.toLocaleString()}</p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500">Perempuan</p>
                <p className="text-2xl font-bold text-neutral-900">{statistics?.population_female?.toLocaleString()}</p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500">Jumlah RT</p>
                <p className="text-2xl font-bold text-neutral-900">{statistics?.rt_count}</p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500">Jumlah RW</p>
                <p className="text-2xl font-bold text-neutral-900">{statistics?.rw_count}</p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500">Jumlah Rumah</p>
                <p className="text-2xl font-bold text-neutral-900">{statistics?.houses_count?.toLocaleString()}</p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500">Sekolah</p>
                <p className="text-2xl font-bold text-neutral-900">{statistics?.schools_count}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <FileText className="text-primary-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Visi & Misi</h2>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-neutral-700 mb-2">Visi</h3>
            <p className="text-lg text-neutral-600 italic">"{villageInfo?.vision}"</p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-700 mb-4">Misi</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {(villageInfo?.mission || []).map((m, i) => (
                <li key={i} className="flex items-start gap-3 bg-neutral-50 rounded-xl p-4">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-neutral-600">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
