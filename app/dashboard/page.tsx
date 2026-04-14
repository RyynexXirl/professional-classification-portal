import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { professions } from '@/lib/professions';

export default function DashboardPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg,#04091a 0%,#07122b 60%,#04091a 100%)' }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {/* Header */}
        <div className="text-center mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-amber-400 transition-colors mb-6"
          >
            <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>←</span>
            العودة للرئيسية
          </Link>

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{
              background: 'rgba(217,119,6,0.12)',
              border: '1px solid rgba(217,119,6,0.25)',
              color: '#fbbf24',
            }}
          >
            المهن الأربع المُصنَّفة
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            لوحة <span className="text-shimmer">التحكم الرئيسية</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            اختر إحدى المهن الأربع للاطلاع على التحليل الشامل وفق التصنيف المهني السعودي الوطني
          </p>
        </div>

        {/* Main 4-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {professions.map((profession, i) => (
            <Link
              key={profession.slug}
              href={`/profession/${profession.slug}`}
              className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
              style={{
                background: 'rgba(13,31,74,0.5)',
                border: `1px solid rgba(${getAccentRGB(profession.accent)},0.2)`,
                boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
                animationDelay: `${i * 120}ms`,
              }}
            >
              {/* Glow overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top right, rgba(${getAccentRGB(profession.accent)},0.12) 0%, transparent 60%)`,
                }}
              />

              {/* Top gradient bar */}
              <div
                className="h-1.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${profession.accent}, transparent)`,
                }}
              />

              <div className="p-7 sm:p-9 relative z-10">
                <div className="flex items-start gap-5 mb-6">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl transition-transform group-hover:scale-110 duration-300"
                    style={{
                      background: `rgba(${getAccentRGB(profession.accent)},0.12)`,
                      border: `1px solid rgba(${getAccentRGB(profession.accent)},0.25)`,
                    }}
                  >
                    {profession.icon}
                  </div>

                  {/* Title block */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="tag-pill mb-2 text-xs"
                      style={{ color: profession.accent, background: `rgba(${getAccentRGB(profession.accent)},0.1)`, border: `1px solid rgba(${getAccentRGB(profession.accent)},0.25)` }}
                    >
                      {profession.field_classification.category}
                    </div>
                    <h2 className="text-xl font-black text-white leading-tight mb-1">{profession.title}</h2>
                    <p className="text-slate-500 text-xs">{profession.title_en}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">{profession.description}</p>

                {/* Quick info grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: 'الكود المهني', value: profession.field_classification.code },
                    { label: 'المستوى', value: profession.field_classification.level.split(' - ')[0] },
                    { label: 'بيئة العمل', value: profession.work_patterns.remote === 'عالية - يمكن أداء معظم المهام عن بُعد' ? 'عن بُعد ممكن' : 'حضوري' },
                    { label: 'عدد القيم', value: `${profession.values.length} قيم` },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl p-3"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <div className="text-xs text-slate-500 mb-1">{item.label}</div>
                      <div className="text-sm font-semibold text-slate-200">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: `1px solid rgba(${getAccentRGB(profession.accent)},0.15)` }}
                >
                  <span className="text-slate-500 text-xs">
                    {profession.characteristics.length} خاصية شخصية
                  </span>
                  <span
                    className="flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-white"
                    style={{ color: profession.accent }}
                  >
                    استعرض التفاصيل الكاملة
                    <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Summary Row */}
        <div
          className="rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          style={{
            background: 'rgba(13,31,74,0.4)',
            border: '1px solid rgba(251,191,36,0.1)',
          }}
        >
          {[
            { icon: '🏷️', label: 'إجمالي المهن', value: '٤ مهن' },
            { icon: '📊', label: 'محاور التحليل', value: '٤ محاور' },
            { icon: '🎯', label: 'القيم المهنية', value: '+٢٨ قيمة' },
            { icon: '📚', label: 'المرجع', label2: 'التصنيف السعودي', value: 'SAUDI NOC' },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-lg font-black text-amber-400 mb-1">{item.value}</div>
              <div className="text-slate-500 text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

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
