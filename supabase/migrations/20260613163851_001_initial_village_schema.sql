-- Village Information
CREATE TABLE village_info (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Desa Sukamaju',
  subdistrict TEXT NOT NULL DEFAULT 'Kecamatan Sukamaju',
  regency TEXT NOT NULL DEFAULT 'Kabupaten Sukamaju',
  province TEXT NOT NULL DEFAULT 'Jawa Barat',
  vision TEXT NOT NULL DEFAULT 'Mewujudkan desa yang maju, mandiri, dan sejahtera',
  mission JSONB NOT NULL DEFAULT '["Meningkatkan kualitas pelayanan publik", "Mengembangkan potensi desa", "Meningkatkan kesejahteraan warga"]',
  history TEXT NOT NULL DEFAULT 'Desa Sukamaju didirikan pada tahun 1945...',
  area_hectares DECIMAL NOT NULL DEFAULT 250.5,
  population_total INTEGER NOT NULL DEFAULT 3500,
  family_total INTEGER NOT NULL DEFAULT 850,
  established_year INTEGER NOT NULL DEFAULT 1945,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Village Officials
CREATE TABLE village_officials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  photo_url TEXT,
  phone TEXT,
  email TEXT,
  period_start INTEGER NOT NULL DEFAULT 2023,
  period_end INTEGER NOT NULL DEFAULT 2029,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Citizens Database
CREATE TABLE citizens (
  id SERIAL PRIMARY KEY,
  nik TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  birth_place TEXT NOT NULL,
  birth_date DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('L', 'P')),
  address TEXT NOT NULL,
  rt TEXT NOT NULL,
  rw TEXT NOT NULL,
  religion TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  occupation TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'moved', 'deceased')),
  family_card_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE citizens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "citizens_read_authenticated" ON citizens FOR SELECT TO authenticated USING (true);
CREATE POLICY "citizens_write_authenticated" ON citizens FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- News & Announcements
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('berita', 'pengumuman', 'kegiatan')),
  image_url TEXT,
  author TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "news_read_all" ON news FOR SELECT TO authenticated USING (true);
CREATE POLICY "news_read_public" ON news FOR SELECT USING (true);
CREATE POLICY "news_write_authenticated" ON news FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- UMKM / Village Products
CREATE TABLE village_products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('kuliner', 'kerajinan', 'pertanian', 'peternakan', 'lainnya')),
  price DECIMAL NOT NULL,
  image_url TEXT,
  seller_name TEXT NOT NULL,
  seller_phone TEXT NOT NULL,
  seller_address TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE village_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_read_public" ON village_products FOR SELECT USING (true);
CREATE POLICY "products_write_authenticated" ON village_products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Tourism Spots
CREATE TABLE tourism_spots (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  address TEXT NOT NULL,
  ticket_price DECIMAL,
  opening_hours TEXT NOT NULL,
  facilities TEXT[],
  latitude DECIMAL,
  longitude DECIMAL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tourism_spots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tourism_read_public" ON tourism_spots FOR SELECT USING (true);
CREATE POLICY "tourism_write_authenticated" ON tourism_spots FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Letter Services Request
CREATE TABLE letter_requests (
  id SERIAL PRIMARY KEY,
  citizen_id INTEGER REFERENCES citizens(id),
  letter_type TEXT NOT NULL,
  purpose TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  notes TEXT,
  processed_by TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE letter_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "letter_requests_crud" ON letter_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- APBDes Financial Reports
CREATE TABLE financial_reports (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('pendapatan', 'belanja', 'pembiayaan')),
  subcategory TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "financial_read_public" ON financial_reports FOR SELECT USING (true);
CREATE POLICY "financial_write_authenticated" ON financial_reports FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Villager Statistics
CREATE TABLE village_statistics (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  population_male INTEGER NOT NULL,
  population_female INTEGER NOT NULL,
  family_count INTEGER NOT NULL,
  rt_count INTEGER NOT NULL,
  rw_count INTEGER NOT NULL,
  houses_count INTEGER NOT NULL,
  schools_count INTEGER NOT NULL DEFAULT 0,
  health_facilities_count INTEGER NOT NULL DEFAULT 0,
  worship_places_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE village_statistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "statistics_read_public" ON village_statistics FOR SELECT USING (true);
CREATE POLICY "statistics_write_authenticated" ON village_statistics FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Contact Messages
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contact_write_public" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_read_authenticated" ON contact_messages FOR SELECT TO authenticated USING (true);

-- Letter Types
CREATE TABLE letter_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  requirements TEXT NOT NULL,
  processing_days INTEGER NOT NULL DEFAULT 3,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE letter_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "letter_types_read_public" ON letter_types FOR SELECT USING (true);
CREATE POLICY "letter_types_write_authenticated" ON letter_types FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert initial village info
INSERT INTO village_info (name, subdistrict, regency, province, vision, mission, history, area_hectares, population_total, family_total, established_year) VALUES (
  'Desa Sukamaju',
  'Kecamatan Sukamaju',
  'Kabupaten Sukamaju',
  'Jawa Barat',
  'Mewujudkan desa yang maju, mandiri, dan sejahtera berbasis pertanian dan pariwisata',
  '["Meningkatkan kualitas pelayanan publik berbasis teknologi", "Mengembangkan potensi pertanian dan pariwisata desa", "Meningkatkan kesejahteraan warga melalui UMKM", "Membangun infrastruktur desa yang memadai"]',
  'Desa Sukamaju didirikan pada tahun 1945 sebagai salah satu desa tertua di Kecamatan Sukamaju. Nama Sukamaju berasal dari kata "Suka" dan "Maju" yang berarti desa yang senang bergerak maju menuju kemakmuran. Pada masa perjuangan kemerdekaan, desa ini menjadi basis perlawanan rakyat melawan penjajah. Sekarang, desa ini terus berkembang dengan potensi pertanian dan pariwisata yang menjanjikan.',
  250.5,
  3500,
  850,
  1945
);

-- Insert village officials
INSERT INTO village_officials (name, position, phone, email, period_start, period_end, display_order) VALUES
('H. Ahmad Suryadi, S.Sos', 'Kepala Desa', '+62 812-3456-7890', 'kades@sukamaju.desa.id', 2023, 2029, 1),
('Siti Nurhaliza, S.E', 'Sekretaris Desa', '+62 821-2345-6789', 'sekwil@sukamaju.desa.id', 2023, 2029, 2),
('Bambang Wijaya', 'Kasi Pemerintahan', '+62 813-4567-8901', 'pemerintahan@sukamaju.desa.id', 2023, 2029, 3),
('Dewi Kartika, A.Md', 'Kasi Kesejahteraan', '+62 822-3456-7890', 'kesejahteraan@sukamaju.desa.id', 2023, 2029, 4),
('Agus Pratama, S.Pd', 'Kasi Pelayanan', '+62 819-5678-9012', 'pelayanan@sukamaju.desa.id', 2023, 2029, 5);

-- Insert letter types
INSERT INTO letter_types (name, requirements, processing_days) VALUES
('Surat Keterangan Domisili', 'KTP, KK', 1),
('Surat Keterangan Tidak Mampu', 'KTP, KK, Surat keterangan RT/RW', 2),
('Surat Keterangan Usaha', 'KTP, KK, Surat keterangan RT/RW', 3),
('Surat Keterangan Kelahiran', 'KTP orang tua, KK, Surat keterangan bidan', 2),
('Surat Keterangan Kematian', 'KTP almarhum, KK, Surat keterangan RS/RW', 1),
('Surat Keterangan Pindah', 'KTP, KK, Surat keterangan penerima', 5),
('Surat Keterangan Pengantar Nikah', 'KTP, KK, Akta kelahiran, Pas foto', 5),
('Surat Keterangan Wali', 'KTP, KK, Surat kuasa', 3);

-- Insert sample news
INSERT INTO news (title, slug, excerpt, content, category, author, is_featured, published_at) VALUES
('Pembangunan Jalan Desa Selesai Dikerjakan', 'jalan-desa-selesai', 'Proyek pembangunan jalan desa sepanjang 2 KM telah rampung dikerjakan dan siap digunakan warga.', 'Proyek pembangunan jalan desa sepanjang 2 KM telah rampung dikerjakan dan siap digunakan warga. Proyek ini dibiayai dari dana APBDes tahun 2024 dan bantuan pemerintah provinsi. Kepala Desa menyampaikan terima kasih kepada seluruh warga yang telah mendukung pembangunan ini.', 'berita', 'Admin', true, NOW() - INTERVAL '2 days'),
('Pendaftaran Program Bantuan Langsung Tunai 2024', 'penerima-blt-2024', 'Pendaftaran penerima Bantuan Langsung Tunai tahun 2024 dibuka mulai tanggal 15 Juni 2024.', 'Pendaftaran penerima Bantuan Langsung Tunai (BLT) tahun 2024 dibuka mulai tanggal 15 Juni 2024. Warga yang terdaftar sebagai keluarga kurang mampu dapat mendaftar ke kantor desa dengan membawa KTP dan KK. Pendaftaran ditutup tanggal 30 Juni 2024.', 'pengumuman', 'Admin', true, NOW() - INTERVAL '5 days'),
('Pelatihan UMKM Olahan Hasil Pertanian', 'pelatihan-umkm-pertanian', 'Kegiatan pelatihan pengolahan hasil pertanian untuk pelaku UMKM desa berlangsung sukses.', 'Kegiatan pelatihan pengolahan hasil pertanian untuk pelaku UMKM desa berlangsung sukses di Balai Desa pada Sabtu, 8 Juni 2024. Peserta mendapatkan materi mengenai pengolahan singkong menjadi berbagai produk bernilai jual tinggi seperti keripik dan tape.', 'kegiatan', 'Admin', false, NOW() - INTERVAL '7 days');

-- Insert sample products
INSERT INTO village_products (name, description, category, price, seller_name, seller_phone, seller_address, is_featured) VALUES
('Keripik Singkong Original', 'Keripik singkong renyah dengan cita rasa original, diproduksi langsung warga desa.', 'kuliner', 15000, 'Ibu Nurhasanah', '+62 823-4567-8901', 'RT 02/RW 03, Desa Sukamaju', true),
('Tas Anyaman Bambu', 'Tas anyaman bambu handcrafted dengan desain modern dan kokoh.', 'kerajinan', 75000, 'Pak Darsih', '+62 856-7890-1234', 'RT 05/RW 02, Desa Sukamaju', true),
('Madu Asli Hutan Desa', 'Madu murni dari lebah hutan sekitar desa dengan kualitas terjamin.', 'pertanian', 120000, 'Pak Suroto', '+62 878-1234-5678', 'RT 08/RW 01, Desa Sukamaju', true),
('Gula Aren Murni', 'Gula aren organik dari perkebunan warga desa tanpa campuran.', 'pertanian', 35000, 'Ibu Sarmilah', '+62 812-9876-5432', 'RT 03/RW 04, Desa Sukamaju', false);

-- Insert tourism spots
INSERT INTO tourism_spots (name, description, address, ticket_price, opening_hours, facilities, is_featured) VALUES
('Air Terjun Sukamaju', 'Air terjun alami dengan ketinggian 15 meter dikelilingi hutan hijau dan udara sejuk pegunungan.', 'Dusun Mekar Jaya, RT 09/RW 05', 10000, '08:00 - 17:00 WIB', ARRAY['Parkiran', 'Gazebo', 'Toilet', 'Warung Makan'], true),
('Agrowisata Kebun Teh', 'Kebun teh hijau dengan spot foto instagramable dan pengalaman petik teh langsung.', 'Dusun Girimulyo, RT 07/RW 03', 15000, '07:00 - 18:00 WIB', ARRAY['Parkiran', 'Cafe', 'Spot Foto', 'Outbound'], true),
('Curug Sindang', 'Curug dengan kolam alami yang cocok untuk berenang dan piknik keluarga.', 'Dusun Sindang, RT 10/RW 06', 5000, '08:00 - 16:00 WIB', ARRAY['Parkiran', 'Gazebo', 'Toilet', 'Area Piknik'], false);

-- Insert financial reports (APBDes)
INSERT INTO financial_reports (year, category, subcategory, amount, description) VALUES
(2024, 'pendapatan', 'Dana Desa', 850000000, 'Alokasi Dana Desa dari APBD'),
(2024, 'pendapatan', 'Bagi Hasil Pajak', 125000000, 'Bagi hasil pajak dari Provinsi'),
(2024, 'pendapatan', 'Hasil Usaha Desa', 80000000, 'Pendapatan dari usaha desa'),
(2024, 'pendapatan', 'Pendapatan Asli Desa', 45000000, 'Sewa tanah dan aset desa'),
(2024, 'belanja', 'Penyelenggaraan Pemerintahan', 250000000, 'Operasional kantor dan gaji perangkat'),
(2024, 'belanja', 'Pelaksanaan Pembangunan', 400000000, 'Pembangunan infrastruktur desa'),
(2024, 'belanja', 'Pembinaan Kemasyarakatan', 150000000, 'Kegiatan sosial dan kemasyarakatan'),
(2024, 'belanja', 'Pemberdayaan Masyarakat', 200000000, 'Pelatihan dan pemberdayaan warga');

-- Insert village statistics
INSERT INTO village_statistics (year, population_male, population_female, family_count, rt_count, rw_count, houses_count, schools_count, health_facilities_count, worship_places_count) VALUES
(2024, 1785, 1715, 850, 12, 5, 875, 3, 1, 6);
