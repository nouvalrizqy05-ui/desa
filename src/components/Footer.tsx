import { useVillage } from '../store/useVillageStore';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react';

const quickLinks = [
  { label: 'Beranda', page: 'home' },
  { label: 'Profil Desa', page: 'profil' },
  { label: 'Layanan Publik', page: 'layanan' },
  { label: 'Transparansi APBDes', page: 'transparansi' },
  { label: 'Berita & Pengumuman', page: 'berita' },
];

const services = [
  'Surat Keterangan Domisili',
  'Surat Keterangan Tidak Mampu',
  'Surat Keterangan Usaha',
  'Surat Keterangan Kelahiran',
  'Surat Keterangan Kematian',
];

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { villageInfo } = useVillage();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{villageInfo?.name}</h3>
                <p className="text-neutral-400 text-sm">{villageInfo?.subdistrict}</p>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Website resmi pemerintah Desa Sukamaju. Mewujudkan pelayanan publik yang transparan, cepat, dan modern untuk kesejahteraan warga.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={14} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Layanan Surat</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => onNavigate('layanan')}
                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-neutral-400 text-sm">
                  {villageInfo?.subdistrict}, {villageInfo?.regency}, {villageInfo?.province}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-400 flex-shrink-0" size={18} />
                <span className="text-neutral-400 text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-400 flex-shrink-0" size={18} />
                <span className="text-neutral-400 text-sm">info@sukamaju.desa.id</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-primary-400 flex-shrink-0" size={18} />
                <span className="text-neutral-400 text-sm">Senin - Jumat: 08:00 - 16:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} {villageInfo?.name}. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <button onClick={() => onNavigate('kontak')} className="hover:text-white transition-colors">Peta Situs</button>
              <button onClick={() => onNavigate('kontak')} className="hover:text-white transition-colors">Kebijakan Privasi</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
