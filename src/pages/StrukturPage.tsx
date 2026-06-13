import { useVillage } from '../store/useVillageStore';
import { Phone, Mail, User, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function StrukturPage() {
  const { villageInfo, officials } = useVillage();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Struktur Organisasi</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Perangkat desa yang melayani masyarakat {villageInfo?.name}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {officials.filter(o => o.position.toLowerCase().includes('kepala desa')).map((kades) => (
          <div key={kades.id} className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-8 mb-8 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
              {kades.photo_url ? (
                <img src={kades.photo_url} alt={kades.name} className="w-full h-full object-cover" />
              ) : (
                <User className="text-primary-500" size={48} />
              )}
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">{kades.name}</h2>
            <p className="text-primary-600 font-semibold mb-4">{kades.position}</p>
            <p className="text-neutral-500 text-sm flex items-center justify-center gap-2">
              <Calendar size={16} />
              Periode {kades.period_start} - {kades.period_end}
            </p>
            <div className="flex justify-center gap-6 mt-6">
              {kades.phone && (
                <a href={`tel:${kades.phone}`} className="flex items-center gap-2 text-neutral-600 hover:text-primary-600">
                  <Phone size={18} /> {kades.phone}
                </a>
              )}
              {kades.email && (
                <a href={`mailto:${kades.email}`} className="flex items-center gap-2 text-neutral-600 hover:text-primary-600">
                  <Mail size={18} /> {kades.email}
                </a>
              )}
            </div>
          </div>
        ))}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {officials.filter(o => !o.position.toLowerCase().includes('kepala desa')).map((official) => (
            <div key={official.id} className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                  {official.photo_url ? (
                    <img src={official.photo_url} alt={official.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="text-primary-500" size={28} />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">{official.name}</h3>
                  <p className="text-primary-600 text-sm font-medium">{official.position}</p>
                </div>
              </div>
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2 text-neutral-500">
                  <Calendar size={14} />
                  Periode {official.period_start} - {official.period_end}
                </p>
                {official.phone && (
                  <a href={`tel:${official.phone}`} className="flex items-center gap-2 text-neutral-600 hover:text-primary-600">
                    <Phone size={14} />
                    {official.phone}
                  </a>
                )}
                {official.email && (
                  <a href={`mailto:${official.email}`} className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 truncate">
                    <Mail size={14} />
                    <span className="truncate">{official.email}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
