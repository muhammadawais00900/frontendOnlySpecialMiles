import { Link } from 'react-router-dom';
import { Clock3, Sparkles, Users } from 'lucide-react';
import { formatCurrency, getCategoryLabel, getLocalizedField } from '../utils/helpers';
import { usePreferences } from '../context/PreferencesContext';

const ProgramCard = ({ program, portal = false }) => {
  const { preferences } = usePreferences();
  const destination = portal ? `/portal/programs/${program._id}` : `/programs/${program.slug || program._id}`;
  const title = getLocalizedField(program, 'title', preferences.language);
  const summary = getLocalizedField(program, 'summary', preferences.language) || getLocalizedField(program, 'description', preferences.language);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {getCategoryLabel(program.category, preferences.language)}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-brand-navy">{title}</h3>
        </div>
        {program.featured ? <Sparkles className="h-5 w-5 text-brand-600" /> : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{summary}</p>
      <div className="mt-5 grid gap-3 text-sm text-slate-500">
        <div className="flex items-center gap-2"><Clock3 className="h-4 w-4" />{program.duration || 'Flexible'}</div>
        <div className="flex items-center gap-2"><Users className="h-4 w-4" />{(program.audience || []).join(', ') || 'All audiences'}</div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-lg font-bold text-brand-navy">{formatCurrency(program.price || 0)}</span>
        <Link to={destination} className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
          {portal ? 'Open' : 'View details'}
        </Link>
      </div>
    </article>
  );
};

export default ProgramCard;
