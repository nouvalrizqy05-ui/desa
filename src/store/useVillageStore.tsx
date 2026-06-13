import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { VillageInfo, VillageOfficial, VillageStatistics, News, VillageProduct, TourismSpot, FinancialReport, LetterType } from '../types';

interface VillageContextType {
  villageInfo: VillageInfo | null;
  officials: VillageOfficial[];
  statistics: VillageStatistics | null;
  news: News[];
  products: VillageProduct[];
  tourismSpots: TourismSpot[];
  financialReports: FinancialReport[];
  letterTypes: LetterType[];
  loading: boolean;
  error: string | null;
}

const VillageContext = createContext<VillageContextType | undefined>(undefined);

export function VillageProvider({ children }: { children: ReactNode }) {
  const [villageInfo, setVillageInfo] = useState<VillageInfo | null>(null);
  const [officials, setOfficials] = useState<VillageOfficial[]>([]);
  const [statistics, setStatistics] = useState<VillageStatistics | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [products, setProducts] = useState<VillageProduct[]>([]);
  const [tourismSpots, setTourismSpots] = useState<TourismSpot[]>([]);
  const [financialReports, setFinancialReports] = useState<FinancialReport[]>([]);
  const [letterTypes, setLetterTypes] = useState<LetterType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [villageRes, officialsRes, statsRes, newsRes, productsRes, tourismRes, financeRes, letterRes] = await Promise.all([
          supabase.from('village_info').select('*').limit(1).maybeSingle(),
          supabase.from('village_officials').select('*').order('display_order'),
          supabase.from('village_statistics').select('*').order('year', { ascending: false }).limit(1).maybeSingle(),
          supabase.from('news').select('*').order('published_at', { ascending: false }),
          supabase.from('village_products').select('*').order('is_featured', { ascending: false }),
          supabase.from('tourism_spots').select('*').order('is_featured', { ascending: false }),
          supabase.from('financial_reports').select('*').order('year', { ascending: false }),
          supabase.from('letter_types').select('*').eq('is_active', true),
        ]);

        if (villageRes.data) setVillageInfo(villageRes.data);
        if (officialsRes.data) setOfficials(officialsRes.data);
        if (statsRes.data) setStatistics(statsRes.data);
        if (newsRes.data) setNews(newsRes.data);
        if (productsRes.data) setProducts(productsRes.data);
        if (tourismRes.data) setTourismSpots(tourismRes.data);
        if (financeRes.data) setFinancialReports(financeRes.data);
        if (letterRes.data) setLetterTypes(letterRes.data);

        console.log('Fetched data:', { villageRes, officialsRes, statsRes, newsRes, productsRes, tourismRes, financeRes, letterRes });
      } catch (err) {
        console.error('Error fetching village data:', err);
        setError('Gagal memuat data desa');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <VillageContext.Provider value={{
      villageInfo,
      officials,
      statistics,
      news,
      products,
      tourismSpots,
      financialReports,
      letterTypes,
      loading,
      error
    }}>
      {children}
    </VillageContext.Provider>
  );
}

export function useVillage() {
  const context = useContext(VillageContext);
  if (context === undefined) {
    throw new Error('useVillage must be used within a VillageProvider');
  }
  return context;
}
