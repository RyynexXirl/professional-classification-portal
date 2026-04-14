'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(4,9,26,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(251,191,36,0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-black"
              style={{
                background: 'linear-gradient(135deg,#d97706,#fbbf24)',
                boxShadow: '0 0 16px rgba(217,119,6,0.4)',
              }}
            >
              ١
            </div>
            <span className="font-bold text-sm text-white leading-tight">
              المشروع الأول
              <br />
              <span className="text-xs font-normal text-gold-400" style={{ color: '#fbbf24' }}>
                التصنيف المهني
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-amber-400 transition-colors">الرئيسية</Link>
            <Link href="/dashboard" className="hover:text-amber-400 transition-colors">لوحة التحكم</Link>
            <Link href="/profession/information-security" className="hover:text-amber-400 transition-colors">المهن</Link>
            <Link
              href="/admin"
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: 'rgba(217,119,6,0.15)',
                border: '1px solid rgba(217,119,6,0.35)',
                color: '#fbbf24',
              }}
            >
              لوحة الإدارة
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-amber-400 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 pb-4 space-y-2 text-sm"
          style={{ borderTop: '1px solid rgba(251,191,36,0.1)' }}
        >
          {[
            { href: '/', label: 'الرئيسية' },
            { href: '/dashboard', label: 'لوحة التحكم' },
            { href: '/profession/information-security', label: 'المهن' },
            { href: '/admin', label: 'لوحة الإدارة' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 px-3 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-white/5 transition-all"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
