import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { professions, getProfessionBySlug } from '@/lib/professions';

function getAccentRGB(hex: string): string {
  const map: Record<string, string> = {
    '#3b82f6': '59,130,246',
    '#10b981': '16,185,129',
    '#8b5cf6': '139,92,246',
    '#f59e0b': '245,158,11',
  };
  return map[hex] ?? '217,119,6';
}

export async function generateStaticParams() {
  return professions.map((p) => ({ slug: p.slug }));
}

export default function ProfessionPage({ params }: { params: { slug: string } }) {
  const profession = getProfessionBySlug(params.slug);
  if (!profession) notFound();

  const rgb = getAccentRGB(profession.accent);
  const otherProfessions = professions.filter((p) => p.slug !== profession.slug);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg,#04091a 0%,#07122b 60%,#04091a 100%)' }}
    >
      <Navbar />

      {/* ══ HERO SECTION ══ */}
      <section
        className="pt-28 pb-16 relative overflow-hidden"
      >
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top right, rgba(${rgb},0.15) 0%, transparent 65%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${rgb},0.06) 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-amber-400 transition-colors">الرئيسية</Link>
            <span>•</span>
            <Link href="/dashboard" className="hover:text-amber-400 transition-colors">لوحة التحكم</Link>
            <span>•</span>
            <span style={{ color: profession.accent }}>{profession.title}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Icon */}
            <div
              className="w-24 h-24 rounded-3xl flex-shrink-0 flex items-center justify-center text-5xl"
              style={{
                background: `rgba(${rgb},0.12)`,
                border: `2px solid rgba(${rgb},0.3)`,
                boxShadow: `0 0 40px rgba(${rgb},0.2)`,
              }}
            >
              {profession.icon}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `rgba(${rgb},0.12)`,
                    border: `1px solid rgba(${rgb},0.3)`,
                    color: profession.accent,
                  }}
                >
                  {profession.field_classification.category}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(217,119,6,0.1)',
                    border: '1px solid rgba(217,119,6,0.25)',
                    color: '#fbbf24',
                  }}
                >
                  {profession.field_classification.code}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
                {profession.title}
              </h1>
              <p className="text-slate-500 text-sm mb-4">{profession.title_en}</p>
              <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                {profession.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTENT SECTIONS ══ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-8">

        {/* ── SECTION 1: CHARACTERISTICS ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(13,31,74,0.5)',
            border: `1px solid rgba(${rgb},0.2)`,
          }}
        >
          {/* Section header */}
          <div
            className="px-7 py-5 flex items-center gap-4"
            style={{
              borderBottom: `1px solid rgba(${rgb},0.15)`,
              background: `rgba(${rgb},0.06)`,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `rgba(${rgb},0.15)`, border: `1px solid rgba(${rgb},0.3)` }}
            >
              🧠
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">المحور الأول</p>
              <h2 className="text-xl font-black text-white">خصائص الشخص المثالي</h2>
            </div>
          </div>

          <div className="p-7">
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
              الصفات والخصائص الشخصية التي يجب توافرها في الشخص الذي يمارس مهنة{' '}
              <span style={{ color: profession.accent }}>{profession.title}</span>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profession.characteristics.map((char, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl transition-colors hover:bg-white/3"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(${rgb},0.1)` }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ background: `rgba(${rgb},0.15)`, color: profession.accent }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{char}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 2: FIELD CLASSIFICATION ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(13,31,74,0.5)',
            border: '1px solid rgba(251,191,36,0.18)',
          }}
        >
          <div
            className="px-7 py-5 flex items-center gap-4"
            style={{
              borderBottom: '1px solid rgba(251,191,36,0.12)',
              background: 'rgba(217,119,6,0.06)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.3)' }}
            >
              🏛️
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">المحور الثاني</p>
              <h2 className="text-xl font-black text-white">تصنيف مجال المهنة</h2>
            </div>
          </div>

          <div className="p-7">
            {/* Classification badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'القطاع', value: profession.field_classification.category, icon: '🏢' },
                { label: 'الكود المهني', value: profession.field_classification.code, icon: '🔖' },
                { label: 'المستوى', value: profession.field_classification.level, icon: '📊' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: 'rgba(217,119,6,0.07)', border: '1px solid rgba(217,119,6,0.15)' }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-xs text-slate-500 mb-1">{item.label}</div>
                  <div className="text-sm font-bold text-amber-300">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251,191,36,0.08)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ background: '#fbbf24' }} />
                <span className="text-sm font-semibold text-amber-400">الوصف التصنيفي الرسمي</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {profession.field_classification.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: WORK PATTERNS ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(13,31,74,0.5)',
            border: `1px solid rgba(${rgb},0.2)`,
          }}
        >
          <div
            className="px-7 py-5 flex items-center gap-4"
            style={{
              borderBottom: `1px solid rgba(${rgb},0.15)`,
              background: `rgba(${rgb},0.06)`,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `rgba(${rgb},0.15)`, border: `1px solid rgba(${rgb},0.3)` }}
            >
              ⚙️
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">المحور الثالث</p>
              <h2 className="text-xl font-black text-white">أنماط العمل المناسبة</h2>
            </div>
          </div>

          <div className="p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'بيئة العمل', value: profession.work_patterns.environment, icon: '🏢' },
                { label: 'ساعات العمل', value: profession.work_patterns.hours, icon: '🕐' },
                { label: 'طبيعة الفريق', value: profession.work_patterns.team, icon: '👥' },
                { label: 'إمكانية العمل عن بُعد', value: profession.work_patterns.remote, icon: '💻' },
                { label: 'المجهود الجسدي', value: profession.work_patterns.physical, icon: '💪' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl p-5"
                  style={{
                    background: `rgba(${rgb},0.05)`,
                    border: `1px solid rgba(${rgb},0.12)`,
                  }}
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <div className="text-xs text-slate-500 mb-2">{item.label}</div>
                  <div className="text-sm text-slate-200 leading-relaxed">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 4: VALUES ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(13,31,74,0.5)',
            border: '1px solid rgba(16,185,129,0.2)',
          }}
        >
          <div
            className="px-7 py-5 flex items-center gap-4"
            style={{
              borderBottom: '1px solid rgba(16,185,129,0.12)',
              background: 'rgba(16,185,129,0.06)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              🌟
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">المحور الرابع</p>
              <h2 className="text-xl font-black text-white">القيم الواجب توافرها</h2>
            </div>
          </div>

          <div className="p-7">
            <p className="text-slate-400 text-sm mb-5">
              القيم المهنية والأخلاقية الضرورية لممارسة هذه المهنة بتميز واحترافية:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profession.values.map((value, i) => {
                const firstWord = value.split(' ')[0];
                const rest = value.substring(firstWord.length);
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.12)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm mt-0.5"
                      style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}
                    >
                      ✓
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      <span className="font-bold text-emerald-400">{firstWord}</span>
                      {rest}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── OTHER PROFESSIONS ── */}
        <div>
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-slate-300">استعرض المهن الأخرى</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherProfessions.map((p) => (
              <Link
                key={p.slug}
                href={`/profession/${p.slug}`}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 group"
                style={{ borderColor: `rgba(${getAccentRGB(p.accent)},0.2)` }}
              >
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">{p.title}</div>
                  <div className="text-xs text-slate-500 truncate">{p.field_classification.category}</div>
                </div>
                <span
                  className="mr-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ transform: 'scaleX(-1)', display: 'inline-block', color: p.accent }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function getAccentRGB(hex: string): string {
  const map: Record<string, string> = {
    '#3b82f6': '59,130,246',
    '#10b981': '16,185,129',
    '#8b5cf6': '139,92,246',
    '#f59e0b': '245,158,11',
  };
  return map[hex] ?? '217,119,6';
}
