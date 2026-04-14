-- ============================================================
--  المشروع الأول: التصنيف المهني
--  Supabase Database Schema
--  Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: professions
-- ============================================================
CREATE TABLE IF NOT EXISTS professions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,          -- Arabic title
  title_en    TEXT NOT NULL,          -- English title
  icon        TEXT NOT NULL,          -- Emoji icon
  color       TEXT NOT NULL,          -- Tailwind gradient class
  accent      TEXT NOT NULL,          -- Hex accent color
  description TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: profession_characteristics
-- ============================================================
CREATE TABLE IF NOT EXISTS profession_characteristics (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profession_id  UUID REFERENCES professions(id) ON DELETE CASCADE,
  characteristic TEXT NOT NULL,
  sort_order     INTEGER DEFAULT 0
);

-- ============================================================
-- TABLE: profession_values
-- ============================================================
CREATE TABLE IF NOT EXISTS profession_values (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profession_id UUID REFERENCES professions(id) ON DELETE CASCADE,
  value_text    TEXT NOT NULL,
  sort_order    INTEGER DEFAULT 0
);

-- ============================================================
-- TABLE: profession_field_classification
-- ============================================================
CREATE TABLE IF NOT EXISTS profession_field_classification (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profession_id UUID UNIQUE REFERENCES professions(id) ON DELETE CASCADE,
  category      TEXT NOT NULL,
  code          TEXT NOT NULL,
  level         TEXT NOT NULL,
  description   TEXT NOT NULL
);

-- ============================================================
-- TABLE: profession_work_patterns
-- ============================================================
CREATE TABLE IF NOT EXISTS profession_work_patterns (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profession_id UUID UNIQUE REFERENCES professions(id) ON DELETE CASCADE,
  environment   TEXT NOT NULL,
  hours         TEXT NOT NULL,
  team          TEXT NOT NULL,
  remote        TEXT NOT NULL,
  physical      TEXT NOT NULL
);

-- ============================================================
-- TRIGGER: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER professions_updated_at
  BEFORE UPDATE ON professions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW-LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE professions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profession_characteristics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profession_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE profession_field_classification ENABLE ROW LEVEL SECURITY;
ALTER TABLE profession_work_patterns ENABLE ROW LEVEL SECURITY;

-- Public read access (anonymous users can read)
CREATE POLICY "Public read professions"
  ON professions FOR SELECT USING (true);

CREATE POLICY "Public read characteristics"
  ON profession_characteristics FOR SELECT USING (true);

CREATE POLICY "Public read values"
  ON profession_values FOR SELECT USING (true);

CREATE POLICY "Public read classification"
  ON profession_field_classification FOR SELECT USING (true);

CREATE POLICY "Public read work patterns"
  ON profession_work_patterns FOR SELECT USING (true);

-- Authenticated users can write (for admin panel)
CREATE POLICY "Auth write professions"
  ON professions FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth write characteristics"
  ON profession_characteristics FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth write values"
  ON profession_values FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth write classification"
  ON profession_field_classification FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth write work patterns"
  ON profession_work_patterns FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA: أخصائي أمن المعلومات
-- ============================================================
DO $$
DECLARE
  p_id UUID;
BEGIN
  INSERT INTO professions (slug, title, title_en, icon, color, accent, description)
  VALUES (
    'information-security',
    'أخصائي أمن المعلومات',
    'Information Security Specialist',
    '🛡️',
    'from-blue-900 to-blue-700',
    '#3b82f6',
    'يعمل أخصائي أمن المعلومات على حماية الأنظمة والشبكات والبيانات من الهجمات الإلكترونية، ويُعدّ خط الدفاع الأول في مواجهة التهديدات الرقمية المتطورة.'
  ) RETURNING id INTO p_id;

  INSERT INTO profession_characteristics (profession_id, characteristic, sort_order) VALUES
    (p_id, 'قدرة تحليلية عالية وتفكير نقدي منهجي', 1),
    (p_id, 'يقظة دائمة ومتابعة مستمرة للتهديدات الرقمية الجديدة', 2),
    (p_id, 'دقة متناهية في التعامل مع التفاصيل التقنية', 3),
    (p_id, 'قدرة على حل المشكلات تحت ضغط الأزمات', 4),
    (p_id, 'فضول معرفي نحو التقنيات الحديثة وأساليب الاختراق', 5),
    (p_id, 'مهارات تواصل قوية لشرح المخاطر التقنية للإدارة', 6),
    (p_id, 'صبر وثبات عند التعامل مع الحوادث الأمنية', 7),
    (p_id, 'تفكير استراتيجي ورؤية استباقية للمخاطر', 8);

  INSERT INTO profession_field_classification (profession_id, category, code, level, description) VALUES
    (p_id, 'تقنية المعلومات والاتصالات', 'ICT-2512', 'المستوى الرابع - أخصائي',
     'يندرج هذا التخصص ضمن مجموعة (ICT) في التصنيف السعودي المهني الوطني، تحت الفئة الفرعية لمتخصصي قواعد البيانات وأمن الشبكات.');

  INSERT INTO profession_work_patterns (profession_id, environment, hours, team, remote, physical) VALUES
    (p_id,
     'مكتبي بالدرجة الأولى، مع إمكانية العمل عن بُعد جزئياً أو كلياً',
     'قد تتضمن نوبات أو مناوبات للاستجابة الفورية للحوادث الأمنية على مدار الساعة',
     'ضمن فرق تقنية متخصصة بالتعاون مع إدارات تقنية المعلومات',
     'عالية - يمكن أداء معظم المهام عن بُعد',
     'منخفضة - عمل ذهني يعتمد على الحاسوب والأدوات الرقمية');

  INSERT INTO profession_values (profession_id, value_text, sort_order) VALUES
    (p_id, 'الأمانة والنزاهة في التعامل مع المعلومات السرية', 1),
    (p_id, 'السرية وصون خصوصية البيانات والمستخدمين', 2),
    (p_id, 'المسؤولية في الإبلاغ عن الثغرات وحماية الأصول', 3),
    (p_id, 'الالتزام بأخلاقيات المهنة ومعايير القطاع', 4),
    (p_id, 'التطوير المستمر ومواكبة المستجدات التقنية', 5),
    (p_id, 'العدالة في تطبيق السياسات الأمنية دون تمييز', 6),
    (p_id, 'الانضباط والالتزام بالبروتوكولات والإجراءات المحددة', 7);
END $$;

-- ============================================================
-- SEED DATA: مرشد سياحي
-- ============================================================
DO $$
DECLARE p_id UUID;
BEGIN
  INSERT INTO professions (slug, title, title_en, icon, color, accent, description)
  VALUES ('tourist-guide','مرشد سياحي','Tourist Guide','🗺️','from-emerald-800 to-teal-600','#10b981',
    'يُجسّد المرشد السياحي واجهة المملكة أمام العالم، إذ يتولى قيادة الزوار وتعريفهم بالتراث الحضاري والمعالم التاريخية والجغرافية.')
  RETURNING id INTO p_id;

  INSERT INTO profession_characteristics (profession_id, characteristic, sort_order) VALUES
    (p_id,'شخصية اجتماعية منفتحة وحضور مؤثر',1),
    (p_id,'إتقان لغتين أو أكثر بمستوى احترافي',2),
    (p_id,'معرفة عميقة بالتاريخ والجغرافيا والتراث السعودي والإسلامي',3),
    (p_id,'صبر وقدرة على التكيّف مع أشخاص من ثقافات متنوعة',4),
    (p_id,'مهارات قيادية ومبادرة في إدارة المجموعات',5),
    (p_id,'قدرة خطابية ومهارة في السرد القصصي الجذاب',6),
    (p_id,'لياقة بدنية وتحمّل للعمل الميداني',7),
    (p_id,'إبداع في تقديم المعلومات بأسلوب شيّق وممتع',8);

  INSERT INTO profession_field_classification (profession_id, category, code, level, description) VALUES
    (p_id,'الخدمات السياحية والضيافة','THS-5113','المستوى الثالث - فني متخصص',
     'يُصنَّف المرشد السياحي في التصنيف السعودي المهني الوطني ضمن فئة عمال خدمات السفر والسياحة.');

  INSERT INTO profession_work_patterns (profession_id, environment, hours, team, remote, physical) VALUES
    (p_id,'ميداني خارجي بالكامل؛ مواقع أثرية وتاريخية ومناطق سياحية',
     'غير منتظمة وتشمل عطل نهاية الأسبوع والمواسم السياحية',
     'مستقل في أغلب الأحيان، أو مرتبط بوكالة سياحية',
     'منخفضة جداً - طبيعة العمل تستلزم التواجد الفعلي',
     'عالية - يتطلب الوقوف والمشي لساعات طويلة');

  INSERT INTO profession_values (profession_id, value_text, sort_order) VALUES
    (p_id,'الانتماء الوطني والفخر بالهوية والتراث السعودي',1),
    (p_id,'الصدق والأمانة في نقل المعلومات التاريخية',2),
    (p_id,'الاحترام الثقافي والتقدير لتنوع الزوار',3),
    (p_id,'المهنية في تقديم الخدمة السياحية بأعلى المعايير',4),
    (p_id,'الحفاظ على المواقع التراثية وصيانة الموروث الوطني',5),
    (p_id,'الترحيب والكرم وتجسيد قيم الضيافة السعودية',6),
    (p_id,'الحماس والشغف بنشر جمال المملكة وتعريف العالم بها',7);
END $$;

-- ============================================================
-- SEED DATA: مضيف جوي
-- ============================================================
DO $$
DECLARE p_id UUID;
BEGIN
  INSERT INTO professions (slug, title, title_en, icon, color, accent, description)
  VALUES ('flight-attendant','مضيف جوي','Flight Attendant','✈️','from-purple-900 to-indigo-700','#8b5cf6',
    'يمثّل المضيف الجوي حارس السلامة الأول على متن الطائرة، ويقدم تجربة سفر استثنائية للركاب بمزيج من الاحترافية العالية واللطف الصادق.')
  RETURNING id INTO p_id;

  INSERT INTO profession_characteristics (profession_id, characteristic, sort_order) VALUES
    (p_id,'مظهر أنيق ولائق يعكس صورة الناقل الجوي',1),
    (p_id,'لياقة بدنية وقدرة على العمل في مساحات ضيقة',2),
    (p_id,'هدوء تام واتزان نفسي في حالات الطوارئ والأزمات',3),
    (p_id,'قدرة على تقديم خدمة متميزة في أوقات الضغط',4),
    (p_id,'إتقان لغة إنجليزية وتفضيل لغة إضافية',5),
    (p_id,'تكيّف سريع مع تغييرات الجدول والمهام المفاجئة',6),
    (p_id,'ذكاء عاطفي في التعامل مع الركاب من كافة الشرائح',7),
    (p_id,'روح فريق ومهارات عمل جماعي داخل الطاقم',8);

  INSERT INTO profession_field_classification (profession_id, category, code, level, description) VALUES
    (p_id,'النقل الجوي وخدمات الطيران','AIR-5111','المستوى الثالث - فني خدمات',
     'يندرج المضيف الجوي في التصنيف المهني السعودي تحت مجموعة خدمات النقل والسفر الجوي.');

  INSERT INTO profession_work_patterns (profession_id, environment, hours, team, remote, physical) VALUES
    (p_id,'داخل الطائرة؛ بيئة متغيرة ومتنقلة بين مدن ودول مختلفة',
     'نوبات طويلة غير منتظمة تشمل الليل والعطل والمناسبات الرسمية',
     'عمل جماعي وثيق ضمن طاقم موحد بقيادة كبير المضيفين',
     'معدومة - العمل يستلزم التواجد الفعلي على متن الرحلة',
     'عالية جداً - ضغط جوي، تغير مناطق زمنية، مجهود جسدي مستمر');

  INSERT INTO profession_values (profession_id, value_text, sort_order) VALUES
    (p_id,'السلامة فوق كل اعتبار - أولوية قصوى في كل رحلة',1),
    (p_id,'الاحترام المتبادل مع الركاب والطاقم بلا استثناء',2),
    (p_id,'المهنية في الالتزام بالبروتوكولات والإجراءات الرسمية',3),
    (p_id,'الابتسامة والترحيب وتقديم تجربة سفر ممتعة',4),
    (p_id,'الإخاء وروح الفريق مع أعضاء الطاقم كافة',5),
    (p_id,'المرونة والقدرة على التكيّف مع المتغيرات السريعة',6),
    (p_id,'الاتزان والتمثيل اللائق لصورة الناقل الجوي',7);
END $$;

-- ============================================================
-- SEED DATA: سائق قطار
-- ============================================================
DO $$
DECLARE p_id UUID;
BEGIN
  INSERT INTO professions (slug, title, title_en, icon, color, accent, description)
  VALUES ('train-driver','سائق قطار','Train Driver','🚄','from-amber-800 to-orange-600','#f59e0b',
    'يتولى سائق القطار مسؤولية ضخمة تتمثل في نقل المئات من الركاب بأمان عبر المسافات الطويلة والقصيرة، مستعيناً بخبرته التقنية ويقظته المستمرة.')
  RETURNING id INTO p_id;

  INSERT INTO profession_characteristics (profession_id, characteristic, sort_order) VALUES
    (p_id,'انضباط صارم والتزام دقيق بالمواعيد والجداول',1),
    (p_id,'يقظة مستدامة وتركيز عالٍ طوال فترة القيادة',2),
    (p_id,'هدوء وثبات الأعصاب في المواقف الحرجة والطارئة',3),
    (p_id,'معرفة تقنية شاملة بأنظمة القطار وإجراءات تشغيله',4),
    (p_id,'مسؤولية عالية وإدراك تام لأهمية الحمولة البشرية',5),
    (p_id,'قدرة على العمل المنفرد لساعات طويلة بتركيز كامل',6),
    (p_id,'امتثال تام للوائح وأنظمة السلامة الصارمة',7),
    (p_id,'دقة في قراءة الإشارات والمؤشرات ومعالجة البيانات التشغيلية',8);

  INSERT INTO profession_field_classification (profession_id, category, code, level, description) VALUES
    (p_id,'النقل البري والسكك الحديدية','TRN-8311','المستوى الثاني - حرفي متخصص',
     'يُصنَّف سائق القطار في التصنيف المهني السعودي ضمن مشغّلي آليات النقل الثقيلة والسكك الحديدية.');

  INSERT INTO profession_work_patterns (profession_id, environment, hours, team, remote, physical) VALUES
    (p_id,'كابينة قيادة مغلقة على مسارات السكك الحديدية المحددة',
     'نوبات دورية منتظمة تشمل الليل وعطل الأسبوع والمناسبات',
     'عمل شبه منفرد داخل الكابينة مع تواصل مستمر مع مركز التحكم',
     'معدومة - يتطلب الحضور الجسدي الكامل في موقع القيادة',
     'متوسطة - جلوس لفترات طويلة مع تنبه ذهني وجسدي مستمر');

  INSERT INTO profession_values (profession_id, value_text, sort_order) VALUES
    (p_id,'الأمان أولاً - الحفاظ على سلامة الركاب والبضائع',1),
    (p_id,'الالتزام والانضباط في الالتزام بالجداول والتعليمات',2),
    (p_id,'الدقة في تنفيذ كل إجراء وفق البروتوكول الرسمي',3),
    (p_id,'المسؤولية الكاملة تجاه الأرواح الموكلة بالرعاية',4),
    (p_id,'الوعي البيئي والحرص على سلامة المحيط والبيئة',5),
    (p_id,'الاحترافية في التعامل مع الأعطال والطوارئ بهدوء',6),
    (p_id,'الصبر والتحمّل في أداء المهام الروتينية الحيوية',7);
END $$;

-- ============================================================
-- Useful views
-- ============================================================
CREATE OR REPLACE VIEW v_professions_full AS
SELECT
  p.id, p.slug, p.title, p.title_en, p.icon, p.accent, p.description,
  pfc.category, pfc.code, pfc.level, pfc.description AS classification_description,
  pwp.environment, pwp.hours, pwp.team, pwp.remote, pwp.physical,
  p.created_at, p.updated_at
FROM professions p
LEFT JOIN profession_field_classification pfc ON pfc.profession_id = p.id
LEFT JOIN profession_work_patterns pwp ON pwp.profession_id = p.id;

-- SELECT * FROM v_professions_full;
