import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMeta } from '../../hooks/useMeta';
import Alert from '../../components/Alert';
import { getResourceDetailContent } from '../../data/resourceDetails';
import { publicResources } from '../../data/publicContent';

const PublicResourceDetailPage = () => {
  const { id } = useParams();
  const resource = useMemo(
    () => publicResources.find((item) => item.slug === id || item._id === id),
    [id],
  );

  useMeta({
    title: resource?.title || 'Resource',
    description: resource?.description || 'Resource details at Special Miles.',
  });

  if (!resource) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Alert variant="error">Resource not found.</Alert>
      </div>
    );
  }

  const detail = getResourceDetailContent(resource);
  const hasRealLink = resource.link && resource.link !== '#';

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/resources" className="text-sm font-semibold text-brand-700 hover:underline">
        ← Back to Resources & Blogs
      </Link>

      <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {resource.type}
        </span>

        <h1 className="mt-4 text-3xl font-bold text-brand-navy md:text-4xl">{resource.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{resource.description}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Category</p>
            <p className="mt-1 font-semibold text-brand-navy">{resource.category}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Format</p>
            <p className="mt-1 font-semibold text-brand-navy">{resource.type}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Duration</p>
            <p className="mt-1 font-semibold text-brand-navy">{resource.duration || 'Self-paced'}</p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-brand-navy">Overview</h2>
        <p className="mt-4 leading-8 text-slate-700">{detail.intro}</p>
      </section>

      <section className="mt-8 grid gap-6">
        {detail.sections.map((section) => (
          <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-brand-navy">{section.title}</h3>
            <p className="mt-4 leading-8 text-slate-700">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-brand-navy">Key takeaways</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {detail.highlights.map((item) => (
            <span key={item} className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
              {item}
            </span>
          ))}
        </div>

        {resource.type === 'Video' && !hasRealLink ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            Video modules are marked as <span className="font-semibold">Coming Soon</span> and are intended for on-platform viewing only.
          </div>
        ) : null}

        {hasRealLink ? (
          <a href={resource.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
            Open original resource
          </a>
        ) : null}
      </section>
    </div>
  );
};

export default PublicResourceDetailPage;
