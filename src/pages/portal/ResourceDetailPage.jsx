
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api/client';
import { useMeta } from '../../hooks/useMeta';
import { getLocalizedField } from '../../utils/helpers';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import CommentPanel from '../../components/CommentPanel';
import LoadingSpinner from '../../components/LoadingSpinner';
import ShareButtons from '../../components/ShareButtons';

const ResourceDetailPage = () => {
  const { id } = useParams();
  const { preferences } = usePreferences();
  const [resource, setResource] = useState(null);
  const [error, setError] = useState('');

  useMeta({
    title: (resource && getLocalizedField(resource, 'title', preferences.language)) || 'Resource',
    description: (resource && getLocalizedField(resource, 'description', preferences.language)) || 'Resource details at Special Miles.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await client.get(`/resources/${id}`);
        setResource(data);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [id]);

  if (error) return <Alert variant="error">{error}</Alert>;
  if (!resource) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <span className="inline-flex rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-semibold text-brand-navy">{resource.type}</span>
        <h1 className="mt-4 text-3xl font-bold text-brand-navy">{getLocalizedField(resource, 'title', preferences.language)}</h1>
        <p className="mt-5 text-slate-700 leading-8">{getLocalizedField(resource, 'description', preferences.language)}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Category</p>
            <p className="mt-1 font-semibold text-brand-navy">{resource.category}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Duration</p>
            <p className="mt-1 font-semibold text-brand-navy">{resource.duration || 'Self-paced'}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={resource.link} target="_blank" rel="noreferrer" className="rounded-2xl bg-brand-green px-5 py-3 font-semibold text-white">
            Open external resource
          </a>
          <ShareButtons title={resource.title} text={resource.description} url={resource.link} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-brand-navy">Discussion</h2>
        <CommentPanel targetType="resource" targetId={id} />
      </section>
    </div>
  );
};

export default ResourceDetailPage;
