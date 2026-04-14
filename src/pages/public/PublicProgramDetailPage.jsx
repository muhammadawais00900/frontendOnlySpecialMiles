import { CheckCircle2, Clock3, PlayCircle, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useMeta } from '../../hooks/useMeta';
import { formatCurrency } from '../../utils/helpers';
import { publicPrograms } from '../../data/publicContent';
import Alert from '../../components/Alert';

const PublicProgramDetailPage = () => {
  const { id } = useParams();
  const program = publicPrograms.find((item) => item.slug === id || item._id === id);

  useMeta({
    title: program?.title || 'Program',
    description: program?.description || 'Program details at Special Miles.',
  });

  if (!program) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Alert variant="error">Program not found.</Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/programs" className="text-sm font-semibold text-brand-700 hover:underline">
        ← Back to Programs
      </Link>

      <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {program.category}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-brand-navy md:text-4xl">{program.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{program.description}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Duration</p>
            <p className="mt-1 font-semibold text-brand-navy">{program.duration}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Delivery mode</p>
            <p className="mt-1 font-semibold text-brand-navy">{program.deliveryMode}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Audience</p>
            <p className="mt-1 font-semibold text-brand-navy">{program.audience.join(', ')}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Price</p>
            <p className="mt-1 font-semibold text-brand-navy">{formatCurrency(program.price)}</p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-brand-navy">Program outcomes</h2>
        <div className="mt-5 grid gap-3">
          {program.outcomes.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <p className="text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-brand-navy">Topics & video modules</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Each program includes several topics and supporting video modules. Video access is shown as Coming Soon and is designed for on-platform viewing only.
        </p>
        <div className="mt-6 grid gap-5">
          {program.topics.map((topic) => (
            <article key={topic.title} className="rounded-3xl border border-slate-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-brand-navy">{topic.title}</h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <Clock3 className="h-4 w-4" />
                    Structured topic pathway
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  <Users className="h-4 w-4" />
                  Guided learning
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {topic.modules.map((module) => (
                  <div key={module} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-brand-700">
                      <PlayCircle className="h-5 w-5" />
                      <span className="text-sm font-semibold">Coming Soon</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{module}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/register" className="rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
          Create account
        </Link>
        <Link to="/contact" className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50">
          Enquire about this program
        </Link>
      </div>
    </div>
  );
};

export default PublicProgramDetailPage;
