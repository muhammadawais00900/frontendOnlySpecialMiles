import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Users2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMeta } from '../../hooks/useMeta';
import ProgramCard from '../../components/ProgramCard';
import SectionHeader from '../../components/SectionHeader';
import {
  homeMedia,
  homeValues,
  publicPrograms,
  publicSiteContent,
  recognitionHighlights,
  whoWeSupport,
} from '../../data/publicContent';

const valueIcons = [
  Sparkles,
  Users2,
  ShieldCheck,
  Lightbulb,
  HeartHandshake,
  BookOpen,
  ShieldCheck,
  Lightbulb,
  Building2,
];

const audienceIcons = [HeartHandshake, BookOpen, Users2, Briefcase, Building2];

const HomePage = () => {
  useMeta({
    title: 'Home',
    description:
      'Special Miles provides inclusive support, expert-led training, practical tools, programs, resources, and a secure role-based portal in one connected experience.',
  });

  const featuredPrograms = publicPrograms.filter((program) => program.featured).slice(0, 4);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-brand-100 bg-white p-8 shadow-soft lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-700">
              Every Mile Matters
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-brand-navy md:text-6xl">
              Empowering individuals, particularly neurodivergent individuals, families, educators, and workplaces through evidence-based training, practical tools, and compassionate support.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Special Miles is dedicated to creating a world where neurodiversity is understood, embraced, and celebrated. We provide inclusive support, expert-led training, and practical resources to empower neurodivergent individuals, families, educators, and organisations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
              >
                Explore programs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="rounded-2xl border border-brand-200 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50"
              >
                Book a consultation
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft">
            <img
              src={homeMedia.hero}
              alt="Supportive learning and inclusion environment"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {publicSiteContent.ribbonItems.map((item) => (
            <article
              key={item.label}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
                {item.label}
              </p>
              <p className="mt-3 text-4xl font-bold text-brand-navy">{item.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Everything needed for the core journey"
          description="A connected platform integrating registration, role-based access, learning pathways, bookings, practical tools, messaging, notifications, and support requests."
        />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
            <img
              src={homeMedia.support}
              alt="Connected support journey"
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Secure role-based portal access',
              'Learning pathways and bookings',
              'Programs, video libraries',
              'Practical tools, messaging, notifications, and support requests',
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-base font-medium leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Impact at a glance"
          description="A snapshot of how Special Miles supports families, educators, students, workplaces, and advocacy through reach, engagement, and outcomes."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <SectionHeader
          title="Our Core Values"
          description="Understanding, acceptance, empowerment, and inclusion guide every program, resource, and learning experience we design."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {homeValues.map((item, index) => {
            const Icon = valueIcons[index] || Sparkles;
            return (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                <Icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Who We Support"
          description="Special Miles partners with families, educators, students, employers, NDIS providers, and strategic partners through one integrated digital platform."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {whoWeSupport.map((item, index) => {
            const Icon = audienceIcons[index] || Users2;
            return (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                <Icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Featured Programs"
          description="Evidence-based programs that strengthen inclusion, wellbeing, learning, and capability across home, education, and workplace settings."
          action={
            <Link to="/programs" className="text-sm font-semibold text-brand-700">
              View all
            </Link>
          }
        />
        <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <img
            src={homeMedia.programs}
            alt="Programs and learning pathways"
            className="h-64 w-full object-cover"
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Resources & Blogs"
          description="Accessible articles, blog insights, videos, practical toolkits, guides, and worksheets designed to support everyday understanding and application."
          action={
            <Link to="/resources" className="text-sm font-semibold text-brand-700">
              Browse all
            </Link>
          }
        />
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <img
            src={homeMedia.resources}
            alt="Resources and blog library"
            className="h-64 w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Recognition & Global Engagement"
          description="Recognised for innovation, inclusion, and impact across education, neurodiversity, and social entrepreneurship."
        />
        <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <img
            src={homeMedia.recognition}
            alt="Recognition and global engagement"
            className="h-64 w-full object-cover"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recognitionHighlights.map((award) => (
            <article
              key={award.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">{award.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{award.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
