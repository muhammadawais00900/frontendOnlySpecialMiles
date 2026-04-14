import { useMemo } from 'react';
import { BookOpenText, FileText } from 'lucide-react';
import { useMeta } from '../../hooks/useMeta';
import ResourceCard from '../../components/ResourceCard';
import SectionHeader from '../../components/SectionHeader';
import { homeMedia, publicResources } from '../../data/publicContent';

const blogTypes = new Set(['Article', 'Guide']);

const ResourcesBlogsPage = () => {
  useMeta({
    title: 'Resources & Blogs',
    description:
      'Explore accessible articles, blog insights, videos, practical toolkits, guides, and worksheets from Special Miles.',
  });

  const blogs = useMemo(() => publicResources.filter((item) => blogTypes.has(item.type)), []);
  const resources = useMemo(() => publicResources.filter((item) => !blogTypes.has(item.type)), []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeader
        title="Resources & Blogs"
        description="Accessible articles, blog insights, videos, practical toolkits, guides, and worksheets designed to support everyday understanding and application."
      />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <img src={homeMedia.resources} alt="Resources and blogs" className="h-72 w-full object-cover" />
      </div>

      <section className="mt-10">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-brand-600" />
          <h2 className="text-2xl font-bold text-brand-navy">Resources</h2>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center gap-3">
          <BookOpenText className="h-6 w-6 text-brand-600" />
          <h2 className="text-2xl font-bold text-brand-navy">Blogs</h2>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResourcesBlogsPage;
