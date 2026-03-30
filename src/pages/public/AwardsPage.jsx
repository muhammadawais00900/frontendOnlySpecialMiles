
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import { useSiteContent } from '../../hooks/useSiteContent';
import LoadingSpinner from '../../components/LoadingSpinner';
import SectionHeader from '../../components/SectionHeader';

const AwardsPage = () => {
  const { t } = usePreferences();
  const { siteContent, loading } = useSiteContent();

  useMeta({
    title: t('nav.awards'),
    description: 'Explore Special Miles global recognition, awards, accelerator participation and strategic engagement.'
  });

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-12"><LoadingSpinner /></div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeader title={t('nav.awards')} description="International recognition and strategic engagement across innovation, inclusion, education and social entrepreneurship." />
      <div className="grid gap-6 lg:grid-cols-2">
        {(siteContent?.awards || []).map((award) => (
          <article key={award.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-brand-navy">{award.title}</h3>
            <p className="mt-4 text-slate-600 leading-7">{award.description}</p>
            {award.link ? (
              <a href={award.link} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-brand-green">
                Visit external reference
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
};

export default AwardsPage;
