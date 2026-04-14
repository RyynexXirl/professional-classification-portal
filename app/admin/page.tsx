'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { professions, Profession } from '@/lib/professions';

export default function AdminPage() {
  const [selected, setSelected] = useState<Profession>(professions[0]);
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');
  const [editData, setEditData] = useState<Profession>(professions[0]);
  const [saved, setSaved] = useState(false);

  function handleSelect(p: Profession) {
    setSelected(p);
    setEditData(p);
    setSaved(false);
    setActiveTab('view');
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    // In production this would call supabase.from('professions').upsert(editData)
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg,#04091a 0%,#07122b 60%,#04091a 100%)' }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-amber-400 transition-colors mb-6"
          >
            <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>←</span>
            العودة للوحة التحكم
          </Link>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">
                لوحة <span className="text-shimmer">الإدارة</span>
              </h1>
              <p className="text-slate-500 text-sm">إدارة وتعديل بيانات المهن المُصنَّفة</p>
            </div>
            <div
              className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
              style={{ background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.2)', color: '#fbbf24' }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              وضع المعاينة — للحفظ الفعلي اربط Supabase
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0 space-y-2">
            <p className="text-xs text-slate-500 px-1 mb-3 font-semibold uppercase tracking-wider">
              المهن ({professions.length})
            </p>
            {professions.map((p) => (
              <button
                key={p.slug}
                onClick={() => handleSelect(p)}
                className="w-full text-right rounded-xl p-4 flex items-center gap-3 transition-all duration-200"
                style={{
                  background: selected.slug === p.slug
                    ? 'rgba(217,119,6,0.15)'
                    : 'rgba(13,31,74,0.4)',
                  border: selected.slug === p.slug
                    ? '1px solid rgba(217,119,6,0.35)'
                    : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span className="text-2xl flex-shrink-0">{p.icon}</span>
                <div className="min-w-0">
                  <div
                    className="font-bold text-sm truncate"
                    style={{ color: selected.slug === p.slug ? '#fbbf24' : '#e2e8f0' }}
                  >
                    {p.title}
                  </div>
                  <div className="text-xs text-slate-500 truncate">{p.field_classification.code}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div
              className="flex gap-1 p-1 rounded-xl mb-6 w-fit"
              style={{ background: 'rgba(13,31,74,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {(['view', 'edit'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    background: activeTab === tab ? 'rgba(217,119,6,0.9)' : 'transparent',
                    color: activeTab === tab ? '#04091a' : '#94a3b8',
                  }}
                >
                  {tab === 'view' ? '👁️ عرض' : '✏️ تعديل'}
                </button>
              ))}
            </div>

            {activeTab === 'view' ? (
              // ── VIEW MODE ──
              <div className="space-y-5">
                {/* Header card */}
                <div
                  className="rounded-2xl p-6 flex items-center gap-5"
                  style={{ background: 'rgba(13,31,74,0.6)', border: '1px solid rgba(251,191,36,0.15)' }}
                >
                  <div className="text-5xl">{selected.icon}</div>
                  <div>
                    <h2 className="text-2xl font-black text-white mb-1">{selected.title}</h2>
                    <div className="flex gap-2 flex-wrap">
                      <span className="tag-pill">{selected.field_classification.category}</span>
                      <span className="tag-pill">{selected.field_classification.code}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="rounded-2xl p-6" style={{ background: 'rgba(13,31,74,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-xs text-slate-500 mb-2">الوصف العام</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{selected.description}</p>
                </div>

                {/* Data tables */}
                {[
                  {
                    title: 'الخصائص الشخصية',
                    icon: '🧠',
                    items: selected.characteristics,
                  },
                  {
                    title: 'القيم المهنية',
                    icon: '🌟',
                    items: selected.values,
                  },
                ].map((section) => (
                  <div key={section.title} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(13,31,74,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                      <span>{section.icon}</span>
                      <span className="font-semibold text-white text-sm">{section.title}</span>
                      <span className="mr-auto text-xs text-slate-500">{section.items.length} عناصر</span>
                    </div>
                    <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                      {section.items.map((item, i) => (
                        <div key={i} className="px-6 py-3 flex items-start gap-3">
                          <span className="text-xs text-slate-600 w-5 flex-shrink-0 pt-0.5">{i + 1}</span>
                          <span className="text-slate-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Work patterns */}
                <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(13,31,74,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                    <span>⚙️</span>
                    <span className="font-semibold text-white text-sm">أنماط العمل</span>
                  </div>
                  <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                    {Object.entries(selected.work_patterns).map(([key, val]) => {
                      const labels: Record<string, string> = {
                        environment: 'بيئة العمل',
                        hours: 'ساعات العمل',
                        team: 'طبيعة الفريق',
                        remote: 'العمل عن بُعد',
                        physical: 'المجهود الجسدي',
                      };
                      return (
                        <div key={key} className="px-6 py-3 flex gap-4">
                          <span className="text-xs text-amber-500 w-28 flex-shrink-0 pt-0.5">{labels[key]}</span>
                          <span className="text-slate-300 text-sm">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    href={`/profession/${selected.slug}`}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg,#d97706,#f59e0b)',
                      color: '#04091a',
                    }}
                  >
                    عرض الصفحة العامة →
                  </Link>
                </div>
              </div>
            ) : (
              // ── EDIT MODE ──
              <div className="space-y-5">
                {saved && (
                  <div
                    className="rounded-xl p-4 text-sm font-semibold text-center"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}
                  >
                    ✅ تم الحفظ بنجاح (في وضع المعاينة — اربط Supabase للحفظ الفعلي)
                  </div>
                )}

                {/* Title */}
                <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(13,31,74,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-sm font-semibold text-amber-400 mb-4">📝 المعلومات الأساسية</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">العنوان العربي</label>
                      <input
                        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">الوصف العام</label>
                      <textarea
                        rows={3}
                        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none resize-none transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Classification */}
                <div className="rounded-2xl p-6 space-y-3" style={{ background: 'rgba(13,31,74,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-sm font-semibold text-amber-400 mb-4">🏛️ بيانات التصنيف</h3>
                  {(['category', 'code', 'level'] as const).map((field) => {
                    const labels = { category: 'القطاع', code: 'الكود المهني', level: 'المستوى' };
                    return (
                      <div key={field}>
                        <label className="block text-xs text-slate-500 mb-1.5">{labels[field]}</label>
                        <input
                          className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                          value={editData.field_classification[field]}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              field_classification: { ...editData.field_classification, [field]: e.target.value },
                            })
                          }
                        />
                      </div>
                    );
                  })}
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">الوصف التصنيفي</label>
                    <textarea
                      rows={4}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none resize-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      value={editData.field_classification.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          field_classification: { ...editData.field_classification, description: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                {/* Characteristics */}
                <div className="rounded-2xl p-6" style={{ background: 'rgba(13,31,74,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-sm font-semibold text-amber-400 mb-4">🧠 الخصائص الشخصية</h3>
                  <div className="space-y-2">
                    {editData.characteristics.map((char, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                          value={char}
                          onChange={(e) => {
                            const updated = [...editData.characteristics];
                            updated[i] = e.target.value;
                            setEditData({ ...editData, characteristics: updated });
                          }}
                        />
                        <button
                          onClick={() => {
                            const updated = editData.characteristics.filter((_, idx) => idx !== i);
                            setEditData({ ...editData, characteristics: updated });
                          }}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
                          style={{ background: 'rgba(255,255,255,0.04)' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        setEditData({ ...editData, characteristics: [...editData.characteristics, ''] })
                      }
                      className="w-full py-2.5 rounded-xl text-xs text-slate-500 hover:text-amber-400 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}
                    >
                      + إضافة خاصية
                    </button>
                  </div>
                </div>

                {/* Values */}
                <div className="rounded-2xl p-6" style={{ background: 'rgba(13,31,74,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-sm font-semibold text-amber-400 mb-4">🌟 القيم المهنية</h3>
                  <div className="space-y-2">
                    {editData.values.map((val, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                          value={val}
                          onChange={(e) => {
                            const updated = [...editData.values];
                            updated[i] = e.target.value;
                            setEditData({ ...editData, values: updated });
                          }}
                        />
                        <button
                          onClick={() => {
                            const updated = editData.values.filter((_, idx) => idx !== i);
                            setEditData({ ...editData, values: updated });
                          }}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
                          style={{ background: 'rgba(255,255,255,0.04)' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setEditData({ ...editData, values: [...editData.values, ''] })}
                      className="w-full py-2.5 rounded-xl text-xs text-slate-500 hover:text-amber-400 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}
                    >
                      + إضافة قيمة
                    </button>
                  </div>
                </div>

                {/* Save button */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => { setEditData(selected); setSaved(false); }}
                    className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg,#d97706,#f59e0b)',
                      color: '#04091a',
                      boxShadow: '0 4px 16px rgba(217,119,6,0.4)',
                    }}
                  >
                    💾 حفظ التغييرات
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
