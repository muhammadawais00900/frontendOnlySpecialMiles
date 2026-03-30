import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import { useSiteContent } from '../../hooks/useSiteContent';
import LoadingSpinner from '../../components/LoadingSpinner';
import SectionHeader from '../../components/SectionHeader';
import { getSiteCopy } from '../../data/siteCopy';

const AboutPage = () => {
  const { t, preferences } = usePreferences();
  const copy = getSiteCopy(preferences.language);
  const { siteContent, loading } = useSiteContent();

  useMeta({
    title: t('nav.about'),
    description: 'Learn about Special Miles, its mission, vision, inclusive approach and global recognition.'
  });

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeader eyebrow="Special Miles" title={copy.about.title} description={copy.about.intro} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{copy.about.missionLabel}</h3>
          <p className="mt-4 text-lg leading-8 text-slate-700">{copy.about.mission}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{copy.about.visionLabel}</h3>
          <p className="mt-4 text-lg leading-8 text-slate-700">{copy.about.vision}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{copy.about.approachLabel}</h3>
          <div className="mt-5 grid gap-4">
            {copy.about.approach.map((point) => (
              <div key={point} className="rounded-2xl bg-slate-50 p-4 text-slate-700">{point}</div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{copy.about.whyChooseTitle}</h3>
          <ul className="mt-5 space-y-3 text-slate-700">
            {copy.about.whyChoose.map((item) => <li key={item} className="rounded-2xl bg-slate-50 p-4">{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{copy.about.casesTitle}</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {copy.about.cases.map((item) => <span key={item} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700">{item}</span>)}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{copy.about.sdgTitle}</h3>
          <ul className="mt-5 space-y-3 text-slate-700">
            {copy.about.sdgs.map((item) => <li key={item} className="rounded-2xl bg-slate-50 p-4">{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Locations & support</h3>
        <div className="mt-5 space-y-4 text-slate-700">
          <p><span className="font-semibold text-brand-navy">Email:</span> {siteContent?.supportEmail}</p>
          <p><span className="font-semibold text-brand-navy">Phone:</span> {siteContent?.supportPhone}</p>
          <div>
            <p className="font-semibold text-brand-navy">Locations:</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {(siteContent?.locations || []).map((location) => <li key={location}>{location}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
