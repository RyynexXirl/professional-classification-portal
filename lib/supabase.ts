import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profession = {
  id: string;
  slug: string;
  title: string;
  title_en: string;
  icon: string;
  color: string;
  description: string;
  characteristics: string[];
  field_classification: {
    category: string;
    code: string;
    level: string;
    description: string;
  };
  work_patterns: {
    environment: string;
    hours: string;
    team: string;
    remote: string;
    physical: string;
  };
  values: string[];
  created_at: string;
  updated_at: string;
};
