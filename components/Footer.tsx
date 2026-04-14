import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="mt-24 py-12 text-center text-sm"
      style={{
        background: 'rgba(4,9,26,0.9)',
        borderTop: '1px solid rgba(251,191,36,0.1)',
        color: 'rgba(148,163,184,0.7)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to right, transparent, rgba(217,119,6,0.4))' }} />
          <span style={{ color: '#d97706' }}>◆</span>
          <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to left, transparent, rgba(217,119,6,0.4))' }} />
        </div>

        <p className="font-semibold text-slate-400 mb-1">المشروع الأول: التصنيف المهني</p>
        <p className="mb-4">
          مشروع تعليمي يستعرض أبرز المهن وفق التصنيف المهني السعودي الوطني
        </p>

        <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
          {[
            { href: '/dashboard', label: 'لوحة التحكم' },
            { href: '/profession/information-security', label: 'أمن المعلومات' },
            { href: '/profession/tourist-guide', label: 'مرشد سياحي' },
            { href: '/profession/flight-attendant', label: 'مضيف جوي' },
            { href: '/profession/train-driver', label: 'سائق قطار' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-amber-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <p className="text-xs" style={{ color: 'rgba(148,163,184,0.4)' }}>
          © {new Date().getFullYear()} — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
