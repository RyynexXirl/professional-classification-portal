import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const stats = [
  { value: '٤', label: 'مهن مصنّفة' },
  { value: '٢٢+', label: 'قيمة مهنية' },
  { value: '١٦+', label: 'نمط عمل محلّل' },
  { value: '١٠٠٪', label: 'وفق المعايير السعودية' },
];

const professionCards = [
  {
    slug: 'information-security',
    title: 'أخصائي أمن المعلومات',
    icon: '🛡️',
    gradient: 'from-blue-900/80 to-blue-700/50',
    border: 'rgba(59,130,246,0.3)',
    glow: 'rgba(59,130,246,0.2)',
    desc: 'حارس الفضاء الرقمي ومكافح الجرائم الإلكترونية',
  },
  {
    slug: 'tourist-guide',
    title: 'مرشد سياحي',
    icon: '🗺️',
    gradient: 'from-emerald-900/80 to-teal-700/50',
    border: 'rgba(16,185,129,0.3)',
    glow: 'rgba(16,185,129,0.2)',
    desc: 'سفير التراث وصاحب أعمق الروايات التاريخية',
  },
  {
    slug: 'flight-attendant',
    title: 'مضيف جوي',
    icon: '✈️',
    gradient: 'from-purple-900/80 to-indigo-700/50',
    border: 'rgba(139,92,246,0.3)',
    glow: 'rgba(139,92,246,0.2)',
    desc: 'ضامن السلامة ومُقدّم تجربة سفر لا تُنسى',
  },
  {
    slug: 'train-driver',
    title: 'سائق قطار',
    icon: '🚄',
    gradient: 'from-amber-900/80 to-orange-700/50',
    border: 'rgba(245,158,11,0.3)',
    glow: 'rgba(245,158,11,0.2)',
    desc: 'قائد رحلة الملايين على خطوط السكك الحديدية',
  },
];

const features = [
  {
    icon: '📋',
    title: 'التصنيف المهني السعودي',
    desc: 'يستند المشروع إلى التصنيف المهني الوطني الصادر عن هيئة تنمية الموارد البشرية (هدف).',
  },
  {
    icon: '🔍',
    title: 'تحليل معمّق',
    desc: 'لكل مهنة: الخصائص الشخصية، أنماط العمل، القيم المهنية، والتصنيف الأكاديمي.',
  },
  {
    icon: '📱',
    title: 'تصميم متجاوب',
    desc: 'يعمل بكفاءة عالية على الأجهزة اللوحية والحواسيب المكتبية والهواتف الذكية.',
  },
  {
    icon: '🏆',
    title: 'معايير موضوعية',
    desc: 'محتوى منتقى بعناية يُعكس متطلبات سوق العمل السعودي في القطاعات الأربعة.',
  },
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-pattern"
      style={{ background: 'linear-gradient(160deg,#04091a 0%,#07122b 50%,#04091a 100%)' }}
    >
      <Navbar />

      {/* ══════════════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Ambient orbs */}
        <div
          className="absolute top-20 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Geometric lines */}
        <div className="absolute inset-0 opacity-5 bg-pattern pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold mb-8 animate-on-load"
            style={{
              background: 'rgba(217,119,6,0.12)',
              border: '1px solid rgba(217,119,6,0.3)',
              color: '#fbbf24',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            مشروع تعليمي — العام الدراسي ١٤٤٦
          </div>

          {/* Title */}
          <h1
            className="font-black mb-6 leading-tight animate-on-load delay-100"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            <span className="text-white">المشروع الأول</span>
            <br />
            <span className="text-shimmer">التصنيف المهني</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-on-load delay-200"
            style={{ fontWeight: 400 }}
          >
            بوابة تعليمية شاملة تستعرض أربع مهن محورية في سوق العمل السعودي، مُحلَّلة وفق
            معايير التصنيف المهني الوطني الصادر عن هيئة تنمية الموارد البشرية.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-on-load delay-300">
            <Link
              href="/dashboard"
              className="px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg,#d97706,#f59e0b)',
                color: '#04091a',
                boxShadow: '0 8px 24px rgba(217,119,6,0.4)',
              }}
            >
              استعرض المهن الأربع →
            </Link>
            <Link
              href="#features"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-300 transition-all duration-300 hover:text-white hover:bg-white/5"
              style={{ border: '1px solid rgba(148,163,184,0.2)' }}
            >
              تعرّف على المشروع
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-on-load delay-400">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-card rounded-2xl p-4 text-center"
              >
                <div
                  className="text-3xl font-black mb-1"
                  style={{ color: '#fbbf24', fontFamily: 'Cairo' }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ PROFESSIONS ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-amber-400 text-sm font-semibold tracking-widest mb-3">المهن المُصنَّفة</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            أربع مهن — تحليل معمّق
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#d97706,#fbbf24)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {professionCards.map((card, i) => (
            <Link
              key={card.slug}
              href={`/profession/${card.slug}`}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 group cursor-pointer"
              style={{
                animationDelay: `${i * 100}ms`,
                borderColor: card.border,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 duration-300"
                style={{
                  background: `radial-gradient(circle,${card.glow},transparent)`,
                  border: `1px solid ${card.border}`,
                }}
              >
                {card.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1 leading-tight">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
              <div
                className="mt-auto flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-amber-300"
                style={{ color: '#d97706' }}
              >
                <span>استعرض التفاصيل</span>
                <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════ FEATURES ══════════════════════════════════════ */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-amber-400 text-sm font-semibold tracking-widest mb-3">مميزات المشروع</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">محتوى شامل ومنهجي</h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#d97706,#fbbf24)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-7 flex gap-5"
            >
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl"
                style={{
                  background: 'rgba(217,119,6,0.12)',
                  border: '1px solid rgba(217,119,6,0.25)',
                }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════ CTA BAND ══════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-10 mb-10">
        <div
          className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg,rgba(13,31,74,0.9),rgba(7,18,43,0.95))',
            border: '1px solid rgba(251,191,36,0.2)',
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(217,119,6,0.4) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
              ابدأ رحلتك المهنية الآن
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              اكتشف التصنيف الكامل لكل مهنة وتعرّف على المتطلبات والقيم والبيئة المثالية لكل دور مهني.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg,#d97706,#f59e0b)',
                color: '#04091a',
                boxShadow: '0 8px 32px rgba(217,119,6,0.5)',
              }}
            >
              <span>انتقل إلى لوحة التحكم</span>
              <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
