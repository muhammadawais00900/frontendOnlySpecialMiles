import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useMeta } from '../../hooks/useMeta';
import { useSiteContent } from '../../hooks/useSiteContent';
import LoadingSpinner from '../../components/LoadingSpinner';
import SectionHeader from '../../components/SectionHeader';
import { usePreferences } from '../../context/PreferencesContext';
import { seoKeywordGroups, allSeoKeywords } from '../../data/seoKeywords';
import { getSiteCopy } from '../../data/siteCopy';

const questionTemplates = {
  en: {
    groupQ: (name) => `How does Special Miles support ${name.toLowerCase()}?`,
    groupA: (name, keywords) => `Special Miles supports ${name.toLowerCase()} through programs, resources, consultancy, bookings, role-based guidance and inclusive practice. This FAQ section also includes the SEO keyword cluster: ${keywords.join(', ')}.`
  },
  hi: {
    groupQ: (name) => `${name} से जुड़ी सहायता Special Miles कैसे प्रदान करता है?`,
    groupA: (name, keywords) => `Special Miles ${name} से जुड़ी सहायता कार्यक्रमों, संसाधनों, परामर्श, बुकिंग और भूमिका-आधारित मार्गदर्शन के माध्यम से प्रदान करता है। इस उत्तर में ये SEO कीवर्ड भी शामिल हैं: ${keywords.join(', ')}.`
  },
  es: {
    groupQ: (name) => `¿Cómo apoya Special Miles ${name.toLowerCase()}?`,
    groupA: (name, keywords) => `Special Miles apoya ${name.toLowerCase()} mediante programas, recursos, consultoría, reservas y orientación inclusiva. Este bloque también incluye las palabras clave SEO: ${keywords.join(', ')}.`
  },
  it: {
    groupQ: (name) => `In che modo Special Miles supporta ${name.toLowerCase()}?`,
    groupA: (name, keywords) => `Special Miles supporta ${name.toLowerCase()} attraverso programmi, risorse, consulenza, prenotazioni e guida inclusiva. Questa risposta include anche le parole chiave SEO: ${keywords.join(', ')}.`
  },
  ar: {
    groupQ: (name) => `كيف تدعم Special Miles مجال ${name.toLowerCase()}؟`,
    groupA: (name, keywords) => `تدعم Special Miles مجال ${name.toLowerCase()} من خلال البرامج والموارد والاستشارات والحجوزات والإرشاد الشامل. كما تتضمن هذه الإجابة كلمات SEO التالية: ${keywords.join(', ')}.`
  }
};

const baseFaqs = {
  en: [
    {
      category: 'General',
      question: 'Who is Special Miles for?',
      answer: 'Special Miles supports neurodiverse children, parents, educators, schools, childcare centres, students, NDIS-linked organisations, employers and strategic partners through programs, consultancy and digital resources.',
      keywords: ['neurodiversity support', 'inclusive education', 'NDIS and related support']
    },
    {
      category: 'Programs',
      question: 'What can I access through the Special Miles platform?',
      answer: 'You can explore programs, access digital resources, enrol in tailored pathways, manage bookings, send messages, track support tickets, update settings and use multilingual accessibility features across the site.',
      keywords: ['role-based portal', 'bookings', 'resources', 'multilingual website']
    },
    {
      category: 'Access',
      question: 'Does language selection apply across the whole website?',
      answer: 'Yes. Language preferences are designed to stay active as you move between public pages and portal sections, while accessibility settings also apply across the experience.',
      keywords: ['multiple languages', 'Arabic website', 'Spanish website', 'Hindi website', 'Italian website']
    }
  ],
  hi: [
    {
      category: 'General',
      question: 'Special Miles किन लोगों के लिए है?',
      answer: 'Special Miles न्यूरोडाइवर्स बच्चों, माता-पिता, शिक्षकों, स्कूलों, छात्रों, NDIS से जुड़े संगठनों, नियोक्ताओं और रणनीतिक भागीदारों का समर्थन करता है।',
      keywords: ['neurodiversity support', 'inclusive education', 'NDIS and related support']
    }
  ],
  es: [{ category: 'General', question: '¿Para quién es Special Miles?', answer: 'Special Miles apoya a niños neurodiversos, familias, docentes, escuelas, estudiantes, organizaciones, empleadores y socios estratégicos.', keywords: ['neurodiversity support', 'inclusive education'] }],
  it: [{ category: 'General', question: 'Per chi è Special Miles?', answer: 'Special Miles supporta bambini neurodiversi, famiglie, educatori, scuole, studenti, organizzazioni, datori di lavoro e partner strategici.', keywords: ['neurodiversity support', 'inclusive education'] }],
  ar: [{ category: 'General', question: 'لمن صُممت Special Miles؟', answer: 'تدعم Special Miles الأطفال ذوي التنوع العصبي والأسر والمعلمين والمدارس والطلاب والمؤسسات وأصحاب العمل والشركاء الاستراتيجيين.', keywords: ['neurodiversity support', 'inclusive education'] }]
};

const FaqPage = () => {
  const { t, preferences } = usePreferences();
  const copy = getSiteCopy(preferences.language);
  const { siteContent, loading } = useSiteContent();
  const [search, setSearch] = useState('');

  useMeta({
    title: t('nav.faq'),
    description: 'Find answers about neurodiversity support, parent coaching, educator training, student success, bookings and accessibility at Special Miles.'
  });

  const generatedFaqs = useMemo(() => {
    const template = questionTemplates[preferences.language] || questionTemplates.en;
    return Object.entries(seoKeywordGroups).map(([groupName, keywords]) => ({
      category: 'SEO',
      question: template.groupQ(groupName),
      answer: template.groupA(groupName, keywords.slice(0, 16)),
      keywords: keywords.slice(0, 24)
    }));
  }, [preferences.language]);

  const faqs = useMemo(() => {
    const manual = baseFaqs[preferences.language] || baseFaqs.en;
    const fromApi = siteContent?.faqs || [];
    const list = [...manual, ...fromApi, ...generatedFaqs];
    if (!search.trim()) return list;
    return list.filter((item) =>
      [item.question, item.answer, ...(item.keywords || [])].join(' ').toLowerCase().includes(search.toLowerCase())
    );
  }, [preferences.language, siteContent, generatedFaqs, search]);

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.slice(0, 30).map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    }),
    [faqs]
  );

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <SectionHeader title={copy.faq.title} description={copy.faq.description} />
      <label className="relative block rounded-3xl border border-slate-200 bg-white p-2 shadow-soft">
        <Search className="pointer-events-none absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={copy.faq.searchPlaceholder}
          className="w-full rounded-2xl py-3 pl-12 pr-4 outline-none"
        />
      </label>

      <div className="mt-8 grid gap-4">
        {faqs.map((faq, index) => (
          <article key={`${faq.question}-${index}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{faq.category}</p>
            <h2 className="mt-3 text-xl font-semibold text-brand-navy">{faq.question}</h2>
            <p className="mt-4 whitespace-pre-line text-slate-600 leading-7">{faq.answer}</p>
            {(faq.keywords || []).length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {faq.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">{keyword}</span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-brand-navy">{copy.faq.seoGroupTitle}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {allSeoKeywords.map((keyword) => (
            <span key={keyword} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
