import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Users2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../../api/client";
import { useMeta } from "../../hooks/useMeta";
import { useSiteContent } from "../../hooks/useSiteContent";
import { usePreferences } from "../../context/PreferencesContext";
import Alert from "../../components/Alert";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProgramCard from "../../components/ProgramCard";
import SectionHeader from "../../components/SectionHeader";
import { getSiteCopy } from "../../data/siteCopy";

const audienceCards = [
  {
    title: "Students",
    description: "Developing study habits, resilience, and executive function.",
  },
  {
    title: "Educators, Childcare Centres & Schools",
    description:
      "Empowering educators with inclusive strategies, professional development and well-being support.",
  },
  {
    title: "Workplaces",
    description:
      "Building high-performing, neuro-inclusive teams and mental health wellbeing.",
  },
];

const HomePage = () => {
  const { t, preferences } = usePreferences();
  const copy = getSiteCopy(preferences.language);
  const {
    siteContent,
    loading: siteLoading,
    error: siteError,
  } = useSiteContent();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useMeta({
    title: "Home",
    description:
      "Special Miles provides multilingual neurodiversity support, programs, bookings, resources, dashboards and stakeholder collaboration in one accessible platform.",
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data: programData } = await client.get("/programs", {
          params: { featured: true },
        });
        setPrograms(programData.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (siteLoading || loading)
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[32px] border border-brand-100 bg-white p-8 shadow-soft lg:p-12">
            <span className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              {t("hero.badge")}
            </span>
            {copy.home.heroEyebrow ? (
              <p className="mt-6 text-sm uppercase tracking-[0.22em] text-brand-700">
                {copy.home.heroEyebrow}
              </p>
            ) : null}
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-brand-navy md:text-6xl">
              {copy.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {copy.home.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
              >
                {copy.home.heroPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="rounded-2xl border border-brand-200 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50"
              >
                {copy.home.heroSecondary}
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
              {copy.home.quickAccessTitle}
            </p>
            <p className="mt-3 text-slate-600">
              {copy.home.quickAccessDescription}
            </p>
            <div className="mt-5 grid gap-3">
              {copy.home.quickAccessItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {siteError ? (
        <div className="mx-auto max-w-7xl px-4">
          <Alert variant="warning">{siteError}</Alert>
        </div>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-6">
        <SectionHeader
          title={copy.home.valuesTitle}
          description={copy.home.valuesDescription}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {copy.home.values.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <Sparkles className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Who we serve"
          description="Special Miles supports key communities through practical, inclusive and role-based pathways."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {audienceCards.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <Users2 className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title={t("home.sectionPrograms")}
          description="Evidence-based programs for families, educators, students and organisations."
          action={
            <Link
              to="/programs"
              className="text-sm font-semibold text-brand-700"
            >
              {t("common.viewAll")}
            </Link>
          }
        />
        <div className="grid gap-6 lg:grid-cols-4">
          {programs.map((program) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title="Resources + Blogs"
          description="Guides, toolkits, videos and articles are grouped together in one easier public category."
          action={
            <Link
              to="/resources"
              className="text-sm font-semibold text-brand-700"
            >
              Browse all
            </Link>
          }
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHeader
          title={copy.home.recognitionTitle}
          description={copy.home.recognitionDescription}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(siteContent?.awards || []).map((award) => (
            <article
              key={award.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                {award.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {award.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
