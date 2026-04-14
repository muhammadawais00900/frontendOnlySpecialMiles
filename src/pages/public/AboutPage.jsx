import { Globe2, HeartHandshake, Lightbulb, MapPin, Users2 } from 'lucide-react';
import { useMeta } from '../../hooks/useMeta';
import SectionHeader from '../../components/SectionHeader';
import {
  aboutContent,
  homeMedia,
  publicSiteContent,
  sdgItems,
} from '../../data/publicContent';

const AboutPage = () => {
  useMeta({
    title: 'About',
    description:
      'Learn about Special Miles, its mission, vision, founders, support areas, and global inclusion-focused approach.',
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeader eyebrow="Special Miles" title="About" description={aboutContent.intro} />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <img
          src={homeMedia.about}
          alt="Inclusive support and learning environment"
          className="h-72 w-full object-cover"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Our Mission</h3>
          <p className="mt-4 text-lg leading-8 text-slate-700">{aboutContent.mission}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Our Vision</h3>
          <p className="mt-4 text-lg leading-8 text-slate-700">{aboutContent.vision}</p>
        </div>
      </div>

      <section className="mt-10">
        <SectionHeader title="Meet The Founders" description={aboutContent.foundersIntro} />
        <div className="grid gap-6 xl:grid-cols-2">
          {aboutContent.founders.map((founder) => (
            <article key={founder.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
              <div className="flex items-start gap-3">
                <Users2 className="mt-1 h-6 w-6 text-brand-600" />
                <div>
                  <h3 className="text-2xl font-semibold text-brand-navy">{founder.name}</h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.16em] text-brand-700">{founder.role}</p>
                </div>
              </div>
              <div className="mt-5 space-y-4 text-slate-700">
                {founder.bio.map((paragraph) => (
                  <p key={paragraph} className="leading-7">{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex items-start gap-3">
            <HeartHandshake className="mt-1 h-6 w-6 text-brand-600" />
            <div>
              <h3 className="text-2xl font-semibold text-brand-navy">Why Special Miles</h3>
              <p className="mt-3 leading-7 text-slate-700">{aboutContent.whySpecialMilesIntro}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {aboutContent.whySpecialMiles.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-1 h-6 w-6 text-brand-600" />
            <div>
              <h3 className="text-2xl font-semibold text-brand-navy">Supporting Every Learner</h3>
              <p className="mt-3 leading-7 text-slate-700">{aboutContent.supportAreasIntro}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {aboutContent.supportAreas.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="flex items-start gap-3">
          <Globe2 className="mt-1 h-6 w-6 text-brand-600" />
          <div>
            <h3 className="text-2xl font-semibold text-brand-navy">Alignment with the UN Sustainable Development Goals</h3>
            <p className="mt-3 leading-7 text-slate-700">
              Special Miles aligns its work with education, wellbeing, inclusion, innovation, and partnership priorities that help create sustainable long-term impact.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sdgItems.map((sdg) => (
            <article key={sdg.number} className="rounded-3xl border border-brand-100 bg-brand-50 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-xl font-bold text-white">
                {sdg.number}
              </div>
              <h4 className="mt-4 text-lg font-semibold text-brand-navy">SDG {sdg.number}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-700">{sdg.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-6 w-6 text-brand-600" />
          <div>
            <h3 className="text-2xl font-semibold text-brand-navy">Where We Work</h3>
            <p className="mt-3 leading-7 text-slate-700">
              We support individuals, families, educators, and organisations across Australia and internationally through training, consultancy, and connected digital support.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-1 font-semibold text-brand-navy">{publicSiteContent.supportEmail}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Phone</p>
            <p className="mt-1 font-semibold text-brand-navy">{publicSiteContent.supportPhone}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Locations</p>
            <div className="mt-1 space-y-1 font-semibold text-brand-navy">
              {publicSiteContent.locations.map((location) => (
                <p key={location}>{location}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
