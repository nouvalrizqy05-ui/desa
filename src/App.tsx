import { useState, useEffect } from 'react';
import { VillageProvider, useVillage } from './store/useVillageStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilPage from './pages/ProfilPage';
import StrukturPage from './pages/StrukturPage';
import StatistikPage from './pages/StatistikPage';
import LayananPage from './pages/LayananPage';
import TransparansiPage from './pages/TransparansiPage';
import BeritaPage from './pages/BeritaPage';
import UMKMPage from './pages/UMKMPage';
import WisataPage from './pages/WisataPage';
import KontakPage from './pages/KontakPage';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { loading, error } = useVillage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'profil':
        return <ProfilPage />;
      case 'struktur':
        return <StrukturPage />;
      case 'statistik':
        return <StatistikPage />;
      case 'layanan':
        return <LayananPage />;
      case 'transparansi':
        return <TransparansiPage />;
      case 'berita':
        return <BeritaPage />;
      case 'umkm':
        return <UMKMPage />;
      case 'wisata':
        return <WisataPage />;
      case 'kontak':
        return <KontakPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-600 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-lg">Memuat data desa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

function App() {
  return (
    <VillageProvider>
      <AppContent />
    </VillageProvider>
  );
}

export default App;
