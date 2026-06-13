import { useVillage } from '../store/useVillageStore';
import { Target, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function VisionMission() {
  const { villageInfo } = useVillage();

  const missionItems = villageInfo?.mission || [
    'Meningkatkan kualitas pelayanan publik berbasis teknologi',
    'Mengembangkan potensi pertanian dan pariwisata desa',
    'Meningkatkan kesejahteraan warga melalui UMKM',
    'Membangun infrastruktur desa yang memadai',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl shadow-sm border border-primary-100 p-8 lg:p-10">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Visi Desa</h3>
            <p className="text-neutral-600 leading-relaxed text-lg">
              "{villageInfo?.vision || 'Mewujudkan desa yang maju, mandiri, dan sejahtera berbasis pertanian dan pariwisata'}"
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-primary-100 p-8 lg:p-10">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Misi Desa</h3>
            <ul className="space-y-3">
              {missionItems.map((mission, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary-500 mt-0.5 flex-shrink-0" size={20} />
                  <span className="text-neutral-600">{mission}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
