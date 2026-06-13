import { useVillage } from '../store/useVillageStore';
import { useState } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Send, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LayananPage() {
  const { letterTypes } = useVillage();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    nik: '',
    letter_type: '',
    purpose: '',
    phone: '',
    address: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase.from('letter_requests').insert({
        citizen_id: null,
        letter_type: form.letter_type,
        purpose: form.purpose,
        status: 'pending',
        notes: `Nama: ${form.name}, NIK: ${form.nik}, Telepon: ${form.phone}, Alamat: ${form.address}`,
      });

      if (error) throw error;
      setSubmitted(true);
      setForm({ name: '', nik: '', letter_type: '', purpose: '', phone: '', address: '' });
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Gagal mengirim permohonan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedLetterType = letterTypes.find(l => l.name === form.letter_type);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Layanan Publik</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Ajukan surat keterangan dan layanan administrasi secara online tanpa harus antre di kantor desa
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Jenis Surat</h2>
            <div className="space-y-3">
              {letterTypes.map((letter) => (
                <button
                  key={letter.id}
                  onClick={() => {
                    setSelectedLetter(letter.id.toString());
                    setForm({ ...form, letter_type: letter.name });
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedLetter === letter.id.toString()
                      ? 'bg-primary-50 border-primary-500'
                      : 'bg-white border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-900">{letter.name}</h3>
                      <p className="text-sm text-neutral-500 flex items-center gap-1 mt-1">
                        <Clock size={14} />
                        {letter.processing_days} hari kerja
                      </p>
                    </div>
                    {selectedLetter === letter.id.toString() && (
                      <CheckCircle className="text-primary-600" size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-primary-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Permohonan Terkirim!</h3>
                  <p className="text-neutral-600 mb-6">
                    Permohonan Anda akan diproses dalam 1-3 hari kerja. Kami akan menghubungi Anda melalui nomor yang Anda cantumkan.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedLetter(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Ajukan Surat Lain
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="text-primary-600" size={24} />
                    <h2 className="text-xl font-bold text-neutral-900">Formulir Permohonan Surat</h2>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-2">
                      <AlertCircle size={20} />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="input-field"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">NIK</label>
                        <input
                          type="text"
                          required
                          maxLength={16}
                          value={form.nik}
                          onChange={(e) => setForm({ ...form, nik: e.target.value })}
                          className="input-field"
                          placeholder="16 digit NIK"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">No. Telepon</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="input-field"
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Jenis Surat</label>
                        <div className="relative">
                          <select
                            required
                            value={form.letter_type}
                            onChange={(e) => {
                              const selected = letterTypes.find(l => l.name === e.target.value);
                              setForm({ ...form, letter_type: e.target.value });
                              setSelectedLetter(selected?.id.toString() || null);
                            }}
                            className="input-field appearance-none pr-10"
                          >
                            <option value="">Pilih jenis surat</option>
                            {letterTypes.map((letter) => (
                              <option key={letter.id} value={letter.name}>
                                {letter.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={20} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Alamat</label>
                      <input
                        type="text"
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="input-field"
                        placeholder="Alamat lengkap (RT/RW)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Keperluan</label>
                      <textarea
                        required
                        rows={3}
                        value={form.purpose}
                        onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                        className="input-field resize-none"
                        placeholder="Jelaskan keperluan pengajuan surat"
                      />
                    </div>

                    {selectedLetterType && (
                      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                        <h4 className="font-semibold text-primary-800 mb-2">Syarat & Ketentuan</h4>
                        <p className="text-primary-700">{selectedLetterType.requirements}</p>
                        <p className="text-sm text-primary-600 mt-2">
                          Waktu proses: {selectedLetterType.processing_days} hari kerja
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn btn-primary disabled:opacity-50"
                    >
                      {submitting ? (
                        'Mengirim...'
                      ) : (
                        <>
                          <Send size={18} />
                          Kirim Permohonan
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-neutral-100 p-4 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-700 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm">Isi Formulir</h3>
                <p className="text-xs text-neutral-500">Lengkapi data diri</p>
              </div>
              <div className="bg-white rounded-xl border border-neutral-100 p-4 text-center">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-amber-700 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm">Proses</h3>
                <p className="text-xs text-neutral-500">1-3 hari kerja</p>
              </div>
              <div className="bg-white rounded-xl border border-neutral-100 p-4 text-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-emerald-700 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm">Ambil Surat</h3>
                <p className="text-xs text-neutral-500">Di kantor desa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
