import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useMeta } from '../../hooks/useMeta';
import SectionHeader from '../../components/SectionHeader';

const allFaqs = [
  {
    category: 'General',
    question: 'Who is Special Miles for?',
    answer:
      'Special Miles supports all individuals, including neurodivergent children, parents, educators, schools, childcare centres, students, NDIS-linked organisations, employers, and strategic partners. Our programs, consultancy, and digital resources are designed to be inclusive, strengths-based, and adaptable to diverse learning and support needs across all contexts.',
  },
  {
    category: 'Programs',
    question: 'What can I access through the Special Miles platform?',
    answer:
      'You can explore programs, access digital resources, enquire about tailored pathways, manage bookings, send messages, track support tickets, and use multilingual accessibility features across the site.',
  },
  {
    category: 'Programs',
    question: 'What programs are currently available?',
    answer:
      'Special Miles offers programs and consultancy pathways across parenting support, educator well-being and inclusion, student success, workplace neurodiversity and inclusion, and inclusive practice consultancy.',
  },
  {
    category: 'Access',
    question: 'How do I get started?',
    answer:
      'You can explore the public website, create an account, choose your language preferences, and continue into the secure portal to access programs, resources, messages, and bookings.',
  },
  {
    category: 'Support',
    question: 'Can organisations request tailored support?',
    answer:
      'Yes. Schools, childcare centres, service providers, NDIS-linked organisations, and workplace teams can request consultancy, workshops, training pathways, and implementation support.',
  },
  {
    category: 'Resources',
    question: 'Are there digital resources available?',
    answer:
      'Yes. The platform includes videos, guides, worksheets, toolkits, and role-based resources designed to support neurodiverse children, students, families, educators, and workplaces.',
  },
  {
    category: 'Bookings',
    question: 'How do bookings work?',
    answer:
      'Users can request a consultation or workshop through the website or portal, select preferred details, and track the request once it is submitted.',
  },
  {
    category: 'Access',
    question: 'How do I reset my password?',
    answer:
      'Use the forgot password option on the sign-in page to create a secure reset link for your account.',
  },
];

const FaqPage = () => {
  const [search, setSearch] = useState('');

  useMeta({
    title: 'FAQ',
    description:
      'Find answers about programs, support, bookings, resources, accessibility, and getting started with Special Miles.',
  });

  const faqs = useMemo(() => {
    if (!search.trim()) return allFaqs;
    return allFaqs.filter((item) =>
      [item.question, item.answer, item.category].join(' ').toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    }),
    [],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <SectionHeader
        title="FAQ"
        description="Find answers for families, educators, students, organisations, and partners."
      />
      <label className="relative block rounded-3xl border border-slate-200 bg-white p-2 shadow-soft">
        <Search className="pointer-events-none absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search questions or answers"
          className="w-full rounded-2xl py-3 pl-12 pr-4 outline-none"
        />
      </label>

      <div className="mt-8 grid gap-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{faq.category}</p>
            <h2 className="mt-3 text-xl font-semibold text-brand-navy">{faq.question}</h2>
            <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">{faq.answer}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
