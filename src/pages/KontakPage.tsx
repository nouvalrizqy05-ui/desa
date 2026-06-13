import { useVillage } from '../store/useVillageStore';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function KontakPage() {
  const { villageInfo } = useVillage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        subject: form.subject,
        message: form.message,
      });

      if (error) throw error;
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hubungi Kami</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Sampaikan pertanyaan, saran, atau keluhan Anda kepada pemerintah desa
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <MapPin className="text-primary-600" size={24} />
                </div>
                <h3 className="font-semibold text-neutral-900">Alamat</h3>
              </div>
              <p className="text-neutral-600">
                Kantor Desa {villageInfo?.name}
                <br />
                {villageInfo?.subdistrict}
                <br />
                {villageInfo?.regency}, {villageInfo?.province}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Phone className="text-primary-600" size={24} />
                </div>
                <h3 className="font-semibold text-neutral-900">Telepon</h3>
              </div>
              <p className="text-neutral-600">
                <a href="tel:+6281234567890" className="hover:text-primary-600">
                  +62 812-3456-7890
                </a>
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Mail className="text-primary-600" size={24} />
                </div>
                <h3 className="font-semibold text-neutral-900">Email</h3>
              </div>
              <p className="text-neutral-600">
                <a href="mailto:info@sukamaju.desa.id" className="hover:text-primary-600">
                  info@sukamaju.desa.id
                </a>
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Clock className="text-primary-600" size={24} />
                </div>
                <h3 className="font-semibold text-neutral-900">Jam Operasional</h3>
              </div>
              <div className="text-neutral-600">
                <p>Senin - Kamis: 08:00 - 16:00</p>
                <p>Jumat: 08:00 - 11:00</p>
                <p>Sabtu & Minggu: Tutup</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Kirim Pesan</h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-primary-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Pesan Terkirim!</h3>
                  <p className="text-neutral-600 mb-6">
                    Terima kasih telah menghubungi kami. Kami akan membalas pesan Anda sesegera mungkin.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-secondary"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
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
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="input-field"
                        placeholder="nama@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">No. Telepon (Opsional)</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input-field"
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Subjek</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="input-field"
                        placeholder="Perihal pesan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Pesan</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-field resize-none"
                      placeholder="Tulis pesan Anda..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn btn-primary disabled:opacity-50"
                  >
                    <Send size={18} />
                    {submitting ? 'Mengirim...' : 'Kirim Pesan'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
