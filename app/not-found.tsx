import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'linear-gradient(160deg,#04091a,#07122b,#04091a)' }}
    >
      <div className="text-7xl mb-6">🔍</div>
      <h1 className="text-6xl font-black text-white mb-4">٤٠٤</h1>
      <p className="text-slate-400 text-lg mb-8">الصفحة المطلوبة غير موجودة</p>
      <Link
        href="/"
        className="px-8 py-3.5 rounded-xl font-bold text-sm"
        style={{
          background: 'linear-gradient(135deg,#d97706,#f59e0b)',
          color: '#04091a',
        }}
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
