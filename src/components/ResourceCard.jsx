import { Link } from 'react-router-dom';
import { FileText, PlayCircle } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getLocalizedField } from '../utils/helpers';

const ResourceCard = ({ resource, portal = false }) => {
  const { preferences } = usePreferences();
  const Icon = resource.type === 'Video' ? PlayCircle : FileText;
  const href = portal ? `/portal/resources/${resource._id}` : resource.link || '#';
  const title = getLocalizedField(resource, 'title', preferences.language);
  const description = getLocalizedField(resource, 'description', preferences.language);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {resource.type}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-brand-navy">{title}</h3>
        </div>
        <Icon className="h-5 w-5 text-brand-600" />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">{resource.category}</p>
        <Link
          to={href}
          target={portal ? undefined : '_blank'}
          rel={portal ? undefined : 'noreferrer'}
          className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {portal ? 'Open' : 'View'}
        </Link>
      </div>
    </article>
  );
};

export default ResourceCard;
