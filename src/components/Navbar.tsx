import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { useVillage } from '../store/useVillageStore';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Beranda' },
  { id: 'profil', label: 'Profil Desa', hasDropdown: true, items: [
    { id: 'profil', label: 'Tentang Desa' },
    { id: 'struktur', label: 'Struktur Organisasi' },
    { id: 'statistik', label: 'Statistik Desa' },
  ]},
  { id: 'layanan', label: 'Layanan' },
  { id: 'transparansi', label: 'Transparansi' },
  { id: 'berita', label: 'Berita' },
  { id: 'umkm', label: 'UMKM' },
  { id: 'wisata', label: 'Wisata' },
  { id: 'kontak', label: 'Kontak' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const { villageInfo } = useVillage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
    setDropdownOpen(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-primary-800 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone size={14} />
              {villageInfo?.officials?.[0]?.phone || '+62 812-3456-7890'}
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} />
              info@sukamaju.desa.id
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              {villageInfo?.subdistrict}, {villageInfo?.regency}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Senin - Jumat: 08:00 - 16:00 WIB</span>
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-neutral-900">{villageInfo?.name || 'Desa Sukamaju'}</h1>
                <p className="text-xs text-neutral-500">{villageInfo?.regency}, {villageInfo?.province}</p>
              </div>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.hasDropdown ? (
                    <button
                      onMouseEnter={() => setDropdownOpen(item.id)}
                      onMouseLeave={() => setDropdownOpen(null)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === item.id || dropdownOpen === item.id
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50/50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === item.id
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  )}

                  {item.hasDropdown && dropdownOpen === item.id && (
                    <div
                      onMouseEnter={() => setDropdownOpen(item.id)}
                      onMouseLeave={() => setDropdownOpen(null)}
                      className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 min-w-48 animate-scale-in"
                    >
                      {item.items?.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavClick(subItem.id)}
                          className="w-full text-left px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('layanan')}
                className="hidden md:flex btn btn-primary"
              >
                Ajukan Surat
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-neutral-600 hover:bg-primary-50"
                      >
                        {item.label}
                        <ChevronDown className={`transition-transform ${dropdownOpen === item.id ? 'rotate-180' : ''}`} size={16} />
                      </button>
                      {dropdownOpen === item.id && (
                        <div className="ml-4 space-y-1">
                          {item.items?.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() => handleNavClick(subItem.id)}
                              className="w-full text-left px-4 py-2 text-neutral-500 hover:text-primary-600"
                            >
                              {subItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                        currentPage === item.id
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-neutral-600 hover:bg-primary-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => handleNavClick('layanan')}
                className="w-full btn btn-primary mt-4"
              >
                Ajukan Surat
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
