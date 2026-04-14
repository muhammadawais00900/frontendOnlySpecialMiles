import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useMeta } from '../../hooks/useMeta';
import ProgramCard from '../../components/ProgramCard';
import SectionHeader from '../../components/SectionHeader';
import { publicPrograms } from '../../data/publicContent';

const categories = ['All', 'Parenting', 'Education', 'Student Success', 'Workplace', 'Consultancy'];

const PublicProgramsPage = () => {
  const [filters, setFilters] = useState({ category: 'All', search: '' });

  useMeta({
    title: 'Programs',
    description:
      'Browse Special Miles programs across parenting, education, student success, workplace inclusion, and consultancy.',
  });

  const programs = useMemo(() => {
    return publicPrograms.filter((program) => {
      const matchesCategory = filters.category === 'All' || program.category === filters.category;
      const haystack = [program.title, program.summary, program.description, ...(program.outcomes || [])]
        .join(' ')
        .toLowerCase();
      const matchesSearch = haystack.includes(filters.search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeader
        title="Programs"
        description="Evidence-based programs that strengthen inclusion, wellbeing, learning, and capability across home, education, and workplace settings."
      />
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
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilters((current) => ({ ...current, category }))}
                className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                  filters.category === category ? 'bg-brand-navy text-white' : 'border border-slate-200 bg-white text-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </div>
  );
};

export default PublicProgramsPage;
