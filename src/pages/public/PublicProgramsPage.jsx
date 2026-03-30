
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import client from '../../api/client';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProgramCard from '../../components/ProgramCard';
import SectionHeader from '../../components/SectionHeader';

const categories = ['All', 'Parenting', 'Education', 'Student Success', 'Workplace', 'Consultancy'];

const PublicProgramsPage = () => {
  const { t, preferences } = usePreferences();
  const [programs, setPrograms] = useState([]);
  const [filters, setFilters] = useState({ category: 'All', search: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useMeta({
    title: t('programs.title'),
    description: 'Browse Special Miles programs for families, educators, students, workplaces and organisational partners.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await client.get('/programs', {
          params: {
            category: filters.category,
            search: filters.search
          }
        });
        setPrograms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters]);

  const categoryButtons = useMemo(
    () =>
      categories.map((category) => ({
        value: category,
        label: category === 'All' ? t('common.all') : t(`categories.${category}`)
      })),
    [preferences.language]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeader title={t('programs.title')} description={t('programs.subtitle')} />
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={filters.search}
              onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
              placeholder="Search programs, outcomes or keywords"
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categoryButtons.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => setFilters((current) => ({ ...current, category: category.value }))}
                className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                  filters.category === category.value ? 'bg-brand-navy text-white' : 'border border-slate-200 bg-white text-slate-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error ? <div className="mt-6"><Alert variant="error">{error}</Alert></div> : null}
      {loading ? (
        <div className="mt-8"><LoadingSpinner /></div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicProgramsPage;
