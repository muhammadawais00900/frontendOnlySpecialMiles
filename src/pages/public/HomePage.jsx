import { ArrowRight, CheckCircle2, Globe2, ShieldCheck, Sparkles, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import client from '../../api/client';
import { useMeta } from '../../hooks/useMeta';
import { useSiteContent } from '../../hooks/useSiteContent';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProgramCard from '../../components/ProgramCard';
import ResourceCard from '../../components/ResourceCard';
import SectionHeader from '../../components/SectionHeader';
import { getSiteCopy } from '../../data/siteCopy';

const HomePage = () => {
  const { t, preferences } = usePreferences();
  const copy = getSiteCopy(preferences.language);
  const { siteContent, loading: siteLoading, error: siteError } = useSiteContent();
  const [programs, setPrograms] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useMeta({
    title: 'Home',
    description: 'Special Miles provides multilingual neurodiversity support, programs, bookings, resources, dashboards and stakeholder collaboration in one accessible platform.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [{ data: programData }, { data: resourceData }] = await Promise.all([
          client.get('/programs', { params: { featured: true } }),
          client.get('/resources')
        ]);
        setPrograms(programData.slice(0, 4));
        setResources(resourceData.filter((item) => item.featured).slice(0, 4));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (siteLoading || loading) return <div className="mx-auto max-w-7xl px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[32px] border border-brand-100 bg-white p-8 shadow-soft lg:p-12">
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              {t('hero.badge')}
            </span>
            <p className="mt-6 text-sm uppercase tracking-[0.22em] text-brand-700">{copy.home.heroEyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-navy md:text-6xl">{copy.home.heroTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{copy.home.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/programs" className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
                {copy.home.heroPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="rounded-2xl border border-brand-200 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50">
                {copy.home.heroSecondary}
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{copy.home.quickAccessTitle}</p>
              <p className="mt-3 text-slate-600">{copy.home.quickAccessDescription}</p>
              <div className="mt-5 grid gap-3">
                {copy.home.quickAccessItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{t('home.impactTitle')}</p>
              <p className="mt-3 text-slate-600">{t('home.impactDescription')}</p>
              <div className="mt-6 grid gap-3">
                {(siteContent?.ribbonItems || []).map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-slate-600">{item.label}</p>
                      <p className="text-xl font-bold text-brand-navy">{item.value}+</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {siteError ? <div className="mx-auto max-w-7xl px-4"><Alert variant="warning">{siteError}</Alert></div> : null}

      <section className="mx-auto max-w-7xl px-4 py-6">
        <SectionHeader title={copy.home.valuesTitle} description={copy.home.valuesDescription} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {copy.home.values.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <Sparkles className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader title={copy.home.impactTitle} description={copy.home.impactDescription} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {copy.home.impactAreas.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <Users2 className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader title={t('home.sectionAudience')} description={copy.home.audienceDescription} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {[t('home.audience1'), t('home.audience2'), t('home.audience3'), t('home.audience4'), t('home.audience5')].map((label) => (
            <div key={label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <Users2 className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">{label}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader title={t('home.sectionPrograms')} description="Evidence-based programs for families, educators, students and organisations." action={<Link to="/programs" className="text-sm font-semibold text-brand-700">{t('common.viewAll')}</Link>} />
        <div className="grid gap-6 lg:grid-cols-4">
          {programs.map((program) => <ProgramCard key={program._id} program={program} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader title={t('home.sectionResources')} description="Videos, toolkits, guides and worksheets in one accessible library." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {resources.map((resource) => <ResourceCard key={resource._id} resource={resource} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader title={copy.home.recognitionTitle} description={copy.home.recognitionDescription} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(siteContent?.awards || []).map((award) => (
            <article key={award.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">{award.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{award.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader title={copy.home.supportCasesTitle} description="Selected cases and support areas represented across programs, resources and consultancy." />
        <div className="flex flex-wrap gap-3">
          {copy.home.supportCases.map((item) => (
            <span key={item} className="rounded-full border border-brand-100 bg-white px-4 py-2 text-sm text-slate-700 shadow-soft">{item}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
