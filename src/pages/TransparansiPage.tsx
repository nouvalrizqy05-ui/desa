import { useVillage } from '../store/useVillageStore';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { useState } from 'react';

export default function TransparansiPage() {
  const { financialReports } = useVillage();
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const years = [...new Set(financialReports.map(r => r.year))].sort((a, b) => b - a);
  const filteredReports = financialReports.filter(r => r.year === selectedYear);

  const pendapatan = filteredReports
    .filter(r => r.category === 'pendapatan')
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const belanja = filteredReports
    .filter(r => r.category === 'belanja')
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const categoryLabels: Record<string, string> = {
    pendapatan: 'Pendapatan Desa',
    belanja: 'Belanja Desa',
    pembiayaan: 'Pembiayaan',
  };

  const subcategoryLabels: Record<string, string> = {
    'Dana Desa': 'Alokasi Dana Desa',
    'Bagi Hasil Pajak': 'Bagi Hasil Pajak',
    'Hasil Usaha Desa': 'Hasil Usaha Desa',
    'Pendapatan Asli Desa': 'Pendapatan Asli Desa',
    'Penyelenggaraan Pemerintahan': 'Penyelenggaraan Pemerintahan',
    'Pelaksanaan Pembangunan': 'Pelaksanaan Pembangunan',
    'Pembinaan Kemasyarakatan': 'Pembinaan Kemasyarakatan',
    'Pemberdayaan Masyarakat': 'Pemberdayaan Masyarakat',
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Transparansi APBDes</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Laporan keuangan Anggaran Pendapatan dan Belanja Desa yang dapat diakses publik
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-3 mb-8">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedYear === year
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-600 hover:bg-primary-50'
              }`}
            >
              Tahun {year}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <span className="text-primary-100">Total Pendapatan</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(pendapatan)}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingDown size={24} />
              </div>
              <span className="text-amber-100">Total Belanja</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(belanja)}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <span className="text-emerald-100">Sisa Anggaran</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(pendapatan - belanja)}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-primary-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">Rincian Pendapatan</h2>
            </div>
            <div className="space-y-4">
              {filteredReports
                .filter(r => r.category === 'pendapatan')
                .map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-neutral-700">{subcategoryLabels[report.subcategory] || report.subcategory}</h3>
                      <p className="text-sm text-neutral-500">{report.description}</p>
                    </div>
                    <span className="font-bold text-primary-700">{formatCurrency(Number(report.amount))}</span>
                  </div>
                ))}
              {filteredReports.filter(r => r.category === 'pendapatan').length === 0 && (
                <p className="text-neutral-500 text-center py-4">Belum ada data</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-amber-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">Rincian Belanja</h2>
            </div>
            <div className="space-y-4">
              {filteredReports
                .filter(r => r.category === 'belanja')
                .map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-neutral-700">{subcategoryLabels[report.subcategory] || report.subcategory}</h3>
                      <p className="text-sm text-neutral-500">{report.description}</p>
                    </div>
                    <span className="font-bold text-amber-700">{formatCurrency(Number(report.amount))}</span>
                  </div>
                ))}
              {filteredReports.filter(r => r.category === 'belanja').length === 0 && (
                <p className="text-neutral-500 text-center py-4">Belum ada data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
