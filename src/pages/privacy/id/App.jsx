import { ArrowLeft, Mail, MapPin, ShieldCheck } from "lucide-react";
import logoImage from "../../../assets/image/realjet-logo.webp";
import { openAnalyticsConsentSettings } from "../../precast-beam-factory/shared/analytics";

const sections = [
  ["who-we-are", "1. Tentang Kami"],
  ["information-we-collect", "2. Data yang Kami Kumpulkan"],
  ["how-we-use-information", "3. Cara Kami Menggunakan Data Pribadi"],
  ["legal-bases", "4. Dasar Pemrosesan"],
  ["sharing", "5. Kapan Kami Membagikan Data Pribadi"],
  ["international-transfers", "6. Transfer Data Internasional"],
  ["retention", "7. Jangka Waktu Penyimpanan Data"],
  ["security", "8. Keamanan Informasi"],
  ["your-rights", "9. Hak Anda"],
  ["cookies", "10. Cookie dan Teknologi Serupa"],
  ["children", "11. Data Anak"],
  ["third-party-links", "12. Tautan Pihak Ketiga"],
  ["changes", "13. Perubahan Kebijakan Privasi"],
  ["contact", "14. Hubungi Kami"],
];

function PolicySection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="text-[clamp(21px,2.2vw,26px)] leading-[1.25] font-[850] tracking-[-0.02em] text-brand-navy">{title}</h2>
      <div className="policy-copy mt-4 space-y-4 text-[15px] leading-[1.75] text-muted">{children}</div>
    </section>
  );
}

function ContactCard() {
  return (
    <div className="mt-5 rounded-card border border-brand-blue/15 bg-soft p-5">
      <strong className="block text-[16px] font-[850] text-brand-navy">Changsha Ruijie Machinery Technology Co., Ltd.</strong>
      <div className="mt-4 grid gap-3 text-[14px]">
        <div className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 shrink-0 text-brand-blue" size={17} aria-hidden="true" />
          <span>No. 48, Jinzhou New District (Jinzhou Development Zone), Ningxiang, Changsha, Hunan, China</span>
        </div>
        <a href="mailto:loyosun@gmail.com" className="flex items-center gap-2.5 font-[750] text-brand-blue underline decoration-brand-blue/25 underline-offset-3 hover:text-brand-navy">
          <Mail size={17} aria-hidden="true" />
          loyosun@gmail.com
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <header className="sticky top-0 z-30 h-[70px] border-b border-white/10 bg-brand-navy/97 text-white backdrop-blur-xl max-[720px]:h-[62px]">
        <div className="site-container flex h-full items-center justify-between gap-5">
          <a href="../../precast-beam-factory/id/" aria-label="Lini produksi pracetak Realjet">
            <img src={logoImage} alt="Logo Realjet" className="h-8 w-auto max-w-60 object-contain max-[720px]:h-[23px] max-[720px]:max-w-[160px]" />
          </a>
          <a href="../../precast-beam-factory/id/" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 px-3 text-[12px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white">
            <ArrowLeft size={15} aria-hidden="true" />
            <span className="max-[430px]:hidden">Kembali ke Lini Produksi</span>
            <span className="hidden max-[430px]:inline">Kembali</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero-gradient text-white">
          <div className="site-container py-16 max-[720px]:py-12">
            <div className="flex max-w-[820px] items-start gap-5">
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-cyan/25 bg-white/8 text-brand-cyan max-[720px]:hidden">
                <ShieldCheck size={27} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[13px] font-[850] tracking-[0.1em] text-[#8ce2e8] uppercase">Perlindungan Data</p>
                <h1 className="mt-2 text-[clamp(36px,5vw,56px)] leading-[1.08] font-[900] tracking-[-0.04em]">Kebijakan Privasi</h1>
                <p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-white/72 max-[720px]:text-[15px]">
                  Kebijakan ini menjelaskan cara Realjet mengumpulkan, menggunakan, menyimpan, membagikan, dan melindungi data pribadi yang disampaikan melalui situs web dan formulir pertanyaan proyek kami.
                </p>
                <p className="mt-5 text-[12px] font-[750] text-white/55">Tanggal berlaku: 1 Agustus 2026</p>
              </div>
            </div>
          </div>
        </section>

        <div className="site-container grid grid-cols-[250px_minmax(0,1fr)] gap-12 py-16 max-[1000px]:grid-cols-1 max-[720px]:gap-8 max-[720px]:py-10">
          <aside className="max-[1000px]:order-2">
            <nav aria-label="Daftar isi kebijakan privasi" className="sticky top-24 rounded-card border border-line bg-soft p-5 max-[1000px]:static">
              <strong className="text-[13px] font-[850] tracking-[0.06em] text-brand-blue uppercase">Isi Halaman</strong>
              <ol className="mt-3 grid gap-1.5">
                {sections.map(([id, title]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="block rounded-md px-2 py-1.5 text-[12px] leading-[1.35] text-muted transition hover:bg-white hover:text-brand-navy">
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-[830px]">
            <div className="mb-8 space-y-4 text-[16px] leading-[1.75] text-muted">
              <p>Changsha Ruijie Machinery Technology Co., Ltd. (“Realjet”, “kami”) menghormati privasi Anda dan berkomitmen menangani data pribadi secara bertanggung jawab dan transparan.</p>
              <p>Kebijakan Privasi ini menjelaskan cara kami mengumpulkan, menggunakan, menyimpan, membagikan, dan melindungi data pribadi ketika Anda mengunjungi situs web kami, mengirimkan pertanyaan proyek, atau menghubungi kami dengan cara lain.</p>
            </div>

            <PolicySection id="who-we-are" title="1. Tentang Kami">
              <p>Organisasi yang bertanggung jawab atas data pribadi yang dijelaskan dalam Kebijakan Privasi ini adalah:</p>
              <ContactCard />
            </PolicySection>

            <PolicySection id="information-we-collect" title="2. Data yang Kami Kumpulkan">
              <h3 className="font-[850] text-brand-navy">2.1 Data yang Anda Berikan</h3>
              <p>Ketika Anda mengirimkan pertanyaan proyek atau menghubungi kami, kami dapat mengumpulkan:</p>
              <ul>
                <li>nama perusahaan Anda;</li>
                <li>nama Anda;</li>
                <li>negara atau wilayah Anda;</li>
                <li>alamat email bisnis Anda;</li>
                <li>informasi mengenai proyek Anda, seperti jenis produk, jumlah, target output, jadwal, kondisi lokasi, dan tahap proyek;</li>
                <li>subjek atau jenis pertanyaan Anda;</li>
                <li>pernyataan bahwa Anda telah membaca Kebijakan Privasi ini;</li>
                <li>informasi lain yang Anda pilih untuk disertakan dalam pesan atau korespondensi selanjutnya.</li>
              </ul>
              <p>Jangan mengirimkan data pribadi sensitif yang tidak diperlukan untuk pertanyaan proyek Anda.</p>
              <h3 className="pt-2 font-[850] text-brand-navy">2.2 Informasi Teknis</h3>
              <p>Penyedia layanan hosting situs web, pemrosesan formulir, keamanan, atau email kami dapat secara otomatis menerima informasi teknis terbatas ketika Anda mengakses atau menggunakan situs web. Informasi ini dapat mencakup:</p>
              <ul>
                <li>alamat Internet Protocol (IP);</li>
                <li>jenis peramban dan perangkat;</li>
                <li>halaman yang diminta atau halaman perujuk;</li>
                <li>tanggal dan waktu akses;</li>
                <li>informasi dasar mengenai keamanan, diagnostik, dan log server.</li>
              </ul>
              <p>Dengan persetujuan Anda, kami menggunakan Google Analytics 4 untuk memahami penggunaan halaman dan meningkatkan alur permintaan proyek. Kami mencatat peristiwa penggunaan pseudonim, seperti tampilan halaman, posisi tombol ajakan bertindak yang dipilih, progres formulir berdasarkan nama kolom, percobaan pengiriman, dan status pengiriman. Nilai yang dimasukkan ke dalam formulir—termasuk nama perusahaan, nama kontak, alamat email, negara, dan rincian proyek—tidak dikirim ke Google Analytics.</p>
            </PolicySection>

            <PolicySection id="how-we-use-information" title="3. Cara Kami Menggunakan Data Pribadi">
              <p>Kami menggunakan data pribadi untuk:</p>
              <ul>
                <li>menerima, menilai, dan menanggapi pertanyaan Anda;</li>
                <li>memahami kebutuhan produksi Anda serta menyiapkan informasi teknis, peralatan, atau komersial yang relevan;</li>
                <li>berkomunikasi dengan Anda mengenai proyek Anda;</li>
                <li>mengatur diskusi teknis, penawaran, demonstrasi, atau dukungan tindak lanjut;</li>
                <li>menyimpan catatan komunikasi bisnis;</li>
                <li>melindungi keamanan dan pengoperasian yang semestinya atas situs web dan sistem pertanyaan kami;</li>
                <li>mematuhi kewajiban hukum, regulasi, dan kontrak;</li>
                <li>menetapkan, melaksanakan, atau mempertahankan klaim hukum;</li>
                <li>meningkatkan situs web, layanan, dan proses penanganan pertanyaan kami dengan menggunakan informasi agregat atau yang tidak mengidentifikasi individu sejauh memungkinkan.</li>
              </ul>
              <p>Kami tidak menggunakan informasi pertanyaan untuk mengambil keputusan yang semata-mata didasarkan pada pemrosesan otomatis dan menimbulkan akibat hukum atau akibat signifikan serupa.</p>
            </PolicySection>

            <PolicySection id="legal-bases" title="4. Dasar Pemrosesan">
              <p>Bergantung pada lokasi dan keadaan Anda, kami memproses data pribadi berdasarkan satu atau beberapa dasar berikut:</p>
              <ul>
                <li><strong>Langkah yang diminta sebelum membuat kontrak atau pelaksanaan kontrak:</strong> ketika kami menanggapi pertanyaan proyek, menyiapkan proposal, atau berkomunikasi mengenai proyek potensial maupun proyek yang sedang berjalan;</li>
                <li><strong>Kepentingan yang sah:</strong> ketika diperlukan untuk menjalankan bisnis, menanggapi pertanyaan bisnis, menyimpan catatan yang sesuai, melindungi sistem, dan meningkatkan layanan kami, sepanjang kepentingan tersebut tidak dikalahkan oleh hak Anda;</li>
                <li><strong>Persetujuan:</strong> ketika Anda telah memberikan persetujuan yang jelas untuk tujuan tertentu dan hukum yang berlaku mensyaratkan persetujuan;</li>
                <li><strong>Kewajiban hukum:</strong> ketika pemrosesan diperlukan untuk mematuhi hukum, peraturan, atau permintaan sah yang berlaku.</li>
              </ul>
              <p>Jika kami mengandalkan persetujuan, Anda dapat menarik persetujuan tersebut kapan saja. Penarikan tidak memengaruhi pemrosesan yang telah dilakukan secara sah sebelum persetujuan ditarik.</p>
            </PolicySection>

            <PolicySection id="sharing" title="5. Kapan Kami Membagikan Data Pribadi">
              <p>Kami hanya dapat membagikan data pribadi jika diperlukan kepada:</p>
              <ul>
                <li>karyawan Realjet yang berwenang dan terlibat dalam penjualan, rekayasa, manajemen proyek, dukungan pelanggan, hukum, keuangan, atau teknologi informasi;</li>
                <li>penyedia layanan hosting situs web, pemrosesan formulir, email, penyimpanan cloud, keamanan siber, dan teknologi informasi lain yang bertindak untuk kami;</li>
                <li>penasihat profesional, auditor, perusahaan asuransi, atau konsultan jika secara wajar diperlukan;</li>
                <li>otoritas pemerintah, regulator, pengadilan, atau lembaga penegak hukum jika diwajibkan oleh hukum atau diperlukan untuk melindungi hak hukum;</li>
                <li>pembeli, investor, atau organisasi penerus sehubungan dengan transaksi perusahaan yang sah, dengan tunduk pada langkah kerahasiaan dan perlindungan data yang sesuai.</li>
              </ul>
              <p>Kami tidak menjual data pribadi.</p>
              <p>Penyedia layanan hanya boleh memproses data untuk layanan yang mereka berikan kepada kami dan wajib melindunginya sesuai dengan persyaratan yang berlaku.</p>
            </PolicySection>

            <PolicySection id="international-transfers" title="6. Transfer Data Internasional">
              <p>Realjet berkedudukan di Tiongkok dan melayani pelanggan di berbagai negara. Oleh karena itu, informasi yang dikirimkan melalui situs web dapat diproses di Tiongkok atau negara lain tempat penyedia layanan kami beroperasi.</p>
              <p>Jika hukum yang berlaku mensyaratkan perlindungan untuk transfer internasional, kami akan menggunakan mekanisme transfer yang sah dan perlindungan kontraktual, organisasi, atau teknis yang wajar.</p>
              <p>Anda dapat menghubungi kami untuk memperoleh informasi lebih lanjut mengenai perlindungan yang relevan dengan data Anda.</p>
            </PolicySection>

            <PolicySection id="retention" title="7. Jangka Waktu Penyimpanan Data">
              <p>Kami biasanya menyimpan informasi pertanyaan proyek hingga <strong>24 bulan setelah interaksi substantif terakhir</strong> agar kami dapat menanggapi perkembangan proyek dan menyimpan catatan bisnis yang sesuai.</p>
              <p>Jika suatu pertanyaan berkembang menjadi penawaran, kontrak, proyek, sengketa, atau kewajiban hukum, informasi yang relevan dapat disimpan lebih lama sebagaimana diwajibkan oleh kontrak, jangka waktu kedaluwarsa klaim, perpajakan, akuntansi, regulasi, atau ketentuan hukum yang berlaku.</p>
              <p>Log teknis dan keamanan disimpan selama jangka waktu yang secara wajar diperlukan untuk pengoperasian, keamanan, dan pemecahan masalah situs web, dengan tunduk pada pengaturan penyedia layanan terkait.</p>
              <p>Ketika informasi tidak lagi diperlukan, kami akan menghapus, menganonimkan, atau mengisolasinya secara aman, kecuali penyimpanan lanjutan diwajibkan oleh hukum.</p>
            </PolicySection>

            <PolicySection id="security" title="8. Keamanan Informasi">
              <p>Kami menggunakan langkah administratif, teknis, dan organisasi yang wajar, yang dirancang untuk melindungi data pribadi dari akses tanpa izin, kehilangan, penyalahgunaan, perubahan, atau pengungkapan.</p>
              <p>Tidak ada situs web, sistem email, atau transmisi Internet yang dapat dijamin sepenuhnya aman. Hindari mengirimkan dokumen teknis rahasia atau data pribadi sensitif melalui formulir pertanyaan umum. Jika diperlukan, kami dapat mengatur metode komunikasi proyek yang sesuai.</p>
            </PolicySection>

            <PolicySection id="your-rights" title="9. Hak Anda">
              <p>Bergantung pada hukum yang berlaku bagi Anda, Anda mungkin memiliki hak untuk:</p>
              <ul>
                <li>meminta konfirmasi apakah kami memproses data pribadi Anda;</li>
                <li>meminta akses ke data pribadi Anda;</li>
                <li>meminta perbaikan data yang tidak akurat atau tidak lengkap;</li>
                <li>meminta penghapusan data Anda;</li>
                <li>meminta pembatasan atas pemrosesan tertentu;</li>
                <li>mengajukan keberatan atas pemrosesan tertentu yang didasarkan pada kepentingan yang sah;</li>
                <li>menarik persetujuan jika pemrosesan didasarkan pada persetujuan;</li>
                <li>meminta portabilitas data jika berlaku;</li>
                <li>meminta informasi mengenai penerima data atau transfer internasional;</li>
                <li>mengajukan pengaduan kepada otoritas perlindungan data atau regulator lain yang berwenang di negara atau wilayah Anda.</li>
              </ul>
              <p>Hak-hak tersebut dapat tunduk pada persyaratan dan pengecualian hukum. Untuk mengajukan permintaan, hubungi kami melalui informasi pada Bagian 1. Kami mungkin perlu memverifikasi identitas Anda sebelum menyelesaikan permintaan.</p>
            </PolicySection>

            <PolicySection id="cookies" title="10. Cookie dan Teknologi Serupa">
              <p>Situs web atau penyedia hostingnya dapat menggunakan fungsi teknis yang benar-benar diperlukan atau mekanisme keamanan untuk menampilkan halaman, memproses pertanyaan, mencegah penyalahgunaan, atau menjaga keandalan layanan.</p>
              <p>Google Analytics 4 adalah layanan analitik opsional dari Google. Penyimpanan analitik ditolak secara bawaan dan hanya diaktifkan setelah Anda memilih “Terima analitik”. Penyimpanan iklan, data pengguna untuk iklan, dan personalisasi iklan tetap dinonaktifkan.</p>
              <p>Anda dapat menerima atau menolak analitik dan mengubah pilihan kapan saja melalui pengaturan analitik.</p>
              <ul>
                <li>Tujuan: mengukur penggunaan halaman dan efektivitas alur permintaan;</li>
                <li>Penyedia: Google LLC (Google Analytics 4);</li>
                <li>Data: informasi pseudonim mengenai perangkat, peramban, halaman, dan interaksi—bukan isi formulir;</li>
                <li>Kontrol: persetujuan dapat diberikan, ditolak, atau ditarik kapan saja.</li>
              </ul>
              <button type="button" onClick={openAnalyticsConsentSettings} className="mt-2 inline-flex min-h-10 items-center rounded-lg border border-brand-blue/25 bg-soft px-4 text-[13px] font-[800] text-brand-blue transition hover:border-brand-blue hover:bg-white">Kelola preferensi analitik</button>
            </PolicySection>

            <PolicySection id="children" title="11. Data Anak">
              <p>Situs web dan layanan pertanyaan proyek kami ditujukan untuk pengguna bisnis dan profesional. Layanan ini tidak ditujukan kepada anak, dan kami tidak secara sengaja mengumpulkan data pribadi anak melalui formulir pertanyaan.</p>
              <p>Jika Anda meyakini bahwa seorang anak telah mengirimkan data pribadi kepada kami, hubungi kami agar kami dapat meninjau dan menghapusnya jika sesuai.</p>
            </PolicySection>

            <PolicySection id="third-party-links" title="12. Tautan Pihak Ketiga">
              <p>Situs web kami dapat memuat tautan ke situs web atau layanan pihak ketiga. Praktik privasi mereka diatur oleh kebijakan masing-masing. Kami tidak bertanggung jawab atas privasi, keamanan, atau isi situs web pihak ketiga.</p>
            </PolicySection>

            <PolicySection id="changes" title="13. Perubahan Kebijakan Privasi">
              <p>Kami dapat memperbarui Kebijakan Privasi ini apabila situs web, layanan, praktik data, atau kewajiban hukum kami berubah.</p>
              <p>Kebijakan yang direvisi akan diterbitkan pada halaman ini dengan tanggal berlaku yang diperbarui. Perubahan material akan ditandai atau dikomunikasikan dengan cara lain jika diwajibkan oleh hukum yang berlaku.</p>
            </PolicySection>

            <PolicySection id="contact" title="14. Hubungi Kami">
              <p>Untuk pertanyaan, permintaan, atau pengaduan terkait privasi, hubungi:</p>
              <ContactCard />
              <p>Kami akan meninjau permintaan Anda dan memberikan tanggapan dalam jangka waktu yang diwajibkan oleh hukum yang berlaku.</p>
            </PolicySection>
          </article>
        </div>
      </main>

      <footer className="bg-[#051a2c] py-6 text-[11px] text-[#89a0b0]">
        <div className="site-container flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-start">
          <span>© 2026 Changsha Ruijie Machinery Technology Co., Ltd. Semua hak dilindungi undang-undang.</span>
          <a href="../../precast-beam-factory/id/" className="underline decoration-white/20 underline-offset-4 transition hover:text-white">Lini Produksi</a>
        </div>
      </footer>
    </>
  );
}
