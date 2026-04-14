# 🏛️ المشروع الأول: التصنيف المهني
### Professional Classification Educational Portal

> بوابة تعليمية شاملة تستعرض أربع مهن محورية في سوق العمل السعودي، مُحلَّلة وفق معايير التصنيف المهني الوطني.

---

## 📁 Project Structure

```
project/
├── app/
│   ├── globals.css              # Global styles + Arabic fonts
│   ├── layout.tsx               # Root layout (RTL, Arabic lang)
│   ├── page.tsx                 # Landing page (Hero + Features)
│   ├── not-found.tsx            # 404 page
│   ├── dashboard/
│   │   └── page.tsx             # Main dashboard (4 profession cards)
│   ├── profession/
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic profession detail page
│   └── admin/
│       └── page.tsx             # Admin panel (view + edit)
├── components/
│   ├── Navbar.tsx               # Responsive Arabic navigation
│   └── Footer.tsx               # Site footer with links
├── lib/
│   ├── supabase.ts              # Supabase client + types
│   └── professions.ts           # Static profession data (Arabic)
├── schema.sql                   # Full Supabase DB schema + seed data
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── .env.local.example
```

---

## 🚀 Quick Start (Local Development)

### Step 1 — Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 2 — Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
ADMIN_SECRET=your-strong-random-secret
```

### Step 3 — Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app runs in Arabic RTL mode.

---

## 🗄️ Supabase Database Setup

### Step 1 — Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Choose a name (e.g., `professional-classification`)
3. Set a strong database password
4. Select region closest to Saudi Arabia: **Middle East (Bahrain)**

### Step 2 — Run Schema & Seed Data

1. In your Supabase dashboard → **SQL Editor**
2. Click **New query**
3. Copy the entire contents of `schema.sql`
4. Paste and click **Run** (▶️)

This creates all tables, enables RLS policies, and seeds all 4 professions with full Arabic content.

### Step 3 — Get API Keys

In Supabase dashboard → **Project Settings** → **API**:
- Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## ☁️ Deploy to Vercel

### Method A — Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

### Method B — Vercel Dashboard (GitHub Integration)

1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit - professional classification portal"
   git remote add origin https://github.com/YOUR_USERNAME/professional-classification.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project**

3. Import your GitHub repository

4. Configure build settings (auto-detected for Next.js):
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`

5. Add Environment Variables in Vercel dashboard:
   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` |
   | `ADMIN_SECRET` | `your-strong-secret` |

6. Click **Deploy** → Done! 🎉

---

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, profession cards, features |
| `/dashboard` | Main hub — all 4 profession cards |
| `/profession/information-security` | أخصائي أمن المعلومات detail page |
| `/profession/tourist-guide` | مرشد سياحي detail page |
| `/profession/flight-attendant` | مضيف جوي detail page |
| `/profession/train-driver` | سائق قطار detail page |
| `/admin` | Admin panel — view & edit all professions |

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `navy-950` | `#04091a` | Page background |
| `navy-900` | `#07122b` | Section background |
| `navy-800` | `#0d1f4a` | Card background |
| `gold-400` | `#fbbf24` | Primary accent, highlights |
| `gold-500` | `#d97706` | Buttons, borders |
| `slate-300` | `#cbd5e1` | Body text |
| `slate-400` | `#94a3b8` | Secondary text |

### Profession Accent Colors
| Profession | Color |
|------------|-------|
| أمن المعلومات | Blue `#3b82f6` |
| مرشد سياحي | Emerald `#10b981` |
| مضيف جوي | Purple `#8b5cf6` |
| سائق قطار | Amber `#f59e0b` |

### Typography
- **Font**: Cairo (Google Fonts) — Arabic-optimized
- **Fallback**: Tajawal, sans-serif
- **Direction**: RTL (`dir="rtl"` on `<html>`)
- **Lang**: `lang="ar"`

---

## 🗃️ Database Schema Overview

```
professions                    — Core profession records
├── profession_characteristics  — Personality traits (1:many)
├── profession_values           — Professional values (1:many)
├── profession_field_classification — Saudi NOC data (1:1)
└── profession_work_patterns    — Work environment data (1:1)

v_professions_full             — Denormalized view for easy querying
```

---

## 🔌 Connecting Admin Panel to Supabase

The admin panel at `/admin` currently works in **preview mode** (in-memory only).
To enable real database saving, update `app/admin/page.tsx`:

```typescript
import { supabase } from '@/lib/supabase';

// Replace the handleSave function:
async function handleSave() {
  const { error } = await supabase
    .from('professions')
    .update({
      title: editData.title,
      description: editData.description,
    })
    .eq('slug', editData.slug);

  if (!error) {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }
}
```

---

## 🛡️ Security Notes

1. **RLS is enabled** on all tables — anonymous users can only READ
2. **Write access** requires Supabase authentication
3. For production admin panel, add Supabase Auth:
   ```bash
   npm install @supabase/auth-ui-react @supabase/auth-ui-shared
   ```
4. Never commit `.env.local` — it's in `.gitignore`

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.2.5 | React framework + SSG |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first styling |
| Supabase | 2.44.x | PostgreSQL database + Auth |
| Cairo (Google Fonts) | — | Arabic typography |
| Lucide React | 0.400.x | Icons |

---

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Safari 15+ (iPad & iPhone)
- ✅ Firefox 88+
- ✅ Edge 90+

---

## 📋 Checklist Before Going Live

- [ ] Run `schema.sql` in Supabase SQL Editor
- [ ] Add all environment variables to Vercel
- [ ] Test all 4 profession pages
- [ ] Test admin panel view & edit modes
- [ ] Verify Arabic RTL layout on iPad
- [ ] Check Google Fonts loading (may need `next/font` for production)
- [ ] Set up custom domain in Vercel (optional)

---

## 👨‍💻 Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

*المشروع الأول: التصنيف المهني — مشروع تعليمي للعام الدراسي ١٤٤٦*
