import { Award, Globe2 } from 'lucide-react';
import { useMeta } from '../../hooks/useMeta';
import SectionHeader from '../../components/SectionHeader';
import { awardsSections, homeMedia } from '../../data/publicContent';

const AwardsPage = () => {
  useMeta({
    title: 'Awards',
    description:
      'Explore Special Miles recognition, awards, global engagement, and strategic inclusion-focused leadership.',
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeader
        title="Recognition & Awards"
        description="Recognition, global engagement, founder leadership, and innovation-focused milestones across inclusion, education, and social entrepreneurship."
      />

      <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <img
          src={homeMedia.recognition}
          alt="Recognition and awards"
          className="h-72 w-full object-cover"
        />
      </div>

      <div className="space-y-8">
        {awardsSections.map((section, index) => (
          <section key={section.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <div className="flex items-start gap-3">
              {index === 0 ? <Globe2 className="mt-1 h-6 w-6 text-brand-600" /> : <Award className="mt-1 h-6 w-6 text-brand-600" />}
              <div>
                <h2 className="text-2xl font-semibold text-brand-navy">{section.title}</h2>
                {section.intro ? <p className="mt-3 leading-7 text-slate-700">{section.intro}</p> : null}
              </div>
            </div>
            {section.items.length ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {section.items.map((item) => (
                  <article key={item.title} className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-700">{item.description}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
};

export default AwardsPage;
