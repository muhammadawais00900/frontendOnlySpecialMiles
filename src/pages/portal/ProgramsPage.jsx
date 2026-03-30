
import { useEffect, useMemo, useState } from 'react';
import client from '../../api/client';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProgramCard from '../../components/ProgramCard';
import ProgressBar from '../../components/ProgressBar';
import SectionHeader from '../../components/SectionHeader';

const ProgramsPage = () => {
  const { t } = usePreferences();
  const [programs, setPrograms] = useState([]);
  const [enrolments, setEnrolments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useMeta({
    title: t('nav.programs'),
    description: 'Manage program enrolments, progress and pathway selection inside the Special Miles portal.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [{ data: programsData }, { data: enrolmentsData }] = await Promise.all([
          client.get('/programs'),
          client.get('/programs/enrolments/my')
        ]);
        setPrograms(programsData);
        setEnrolments(enrolmentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const enrolledProgramIds = useMemo(() => new Set(enrolments.map((item) => item.program?._id || item.program)), [enrolments]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <SectionHeader title={t('nav.programs')} description={t('programs.subtitle')} />
      {error ? <Alert variant="error">{error}</Alert> : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-brand-navy">My active learning</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {enrolments.map((item) => (
            <div key={item._id} className="rounded-3xl bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy">{item.program?.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.program?.category}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{item.status}</span>
              </div>
              <div className="mt-5">
                <ProgressBar value={item.progress} label="Progress" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-brand-navy">Available pathways</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {programs.map((program) => (
            <div key={program._id} className="relative">
              {enrolledProgramIds.has(program._id) ? (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {t('programs.enrolled')}
                </span>
              ) : null}
              <ProgramCard program={program} portal />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
