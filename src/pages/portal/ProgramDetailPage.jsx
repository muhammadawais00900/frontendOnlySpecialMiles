
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api/client';
import { formatCurrency, formatDate, getLocalizedField, getLocalizedList } from '../../utils/helpers';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import CommentPanel from '../../components/CommentPanel';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProgressBar from '../../components/ProgressBar';
import ShareButtons from '../../components/ShareButtons';

const ProgramDetailPage = () => {
  const { id } = useParams();
  const { t, preferences } = usePreferences();
  const [program, setProgram] = useState(null);
  const [myEnrolments, setMyEnrolments] = useState([]);
  const [progressValue, setProgressValue] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useMeta({
    title: (program && getLocalizedField(program, 'title', preferences.language)) || 'Program',
    description: (program && (getLocalizedField(program, 'summary', preferences.language) || getLocalizedField(program, 'description', preferences.language))) || 'Program details at Special Miles.'
  });

  const myEnrolment = useMemo(
    () => myEnrolments.find((item) => (item.program?._id || item.program) === id),
    [myEnrolments, id]
  );

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [{ data: programData }, { data: enrolmentsData }] = await Promise.all([
          client.get(`/programs/${id}`),
          client.get('/programs/enrolments/my')
        ]);
        setProgram(programData);
        setMyEnrolments(enrolmentsData);
        const currentEnrolment = enrolmentsData.find((item) => (item.program?._id || item.program) === id);
        setProgressValue(currentEnrolment?.progress || 0);
      } catch (err) {
        setFeedback({ type: 'error', message: err.message });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const enroll = async () => {
    try {
      const { data } = await client.post(`/programs/${id}/enroll`);
      setMyEnrolments((current) => [data, ...current.filter((item) => (item.program?._id || item.program) !== id)]);
      setProgressValue(data.progress);
      setFeedback({ type: 'success', message: 'Program enrolled successfully.' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  const updateProgress = async () => {
    if (!myEnrolment?._id) return;
    try {
      const { data } = await client.patch(`/programs/enrolments/${myEnrolment._id}/progress`, { progress: Number(progressValue) });
      setMyEnrolments((current) => current.map((item) => (item._id === myEnrolment._id ? data : item)));
      setFeedback({ type: 'success', message: 'Progress updated.' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!program) return <Alert variant="error">{feedback?.message || 'Program not found.'}</Alert>;

  return (
    <div className="space-y-8">
      {feedback ? <Alert variant={feedback.type}>{feedback.message}</Alert> : null}
      <section className="grid gap-6 xl:grid-cols-[1fr_0.38fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <span className="inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
            {program.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-brand-navy">{getLocalizedField(program, 'title', preferences.language)}</h1>
          <p className="mt-5 text-slate-700 leading-8">{getLocalizedField(program, 'description', preferences.language)}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{t('programs.duration')}</p>
              <p className="mt-1 font-semibold text-brand-navy">{program.duration}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{t('programs.deliveryMode')}</p>
              <p className="mt-1 font-semibold text-brand-navy">{program.deliveryMode}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{t('programs.audience')}</p>
              <p className="mt-1 font-semibold text-brand-navy">{(program.audience || []).join(', ')}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-1 font-semibold text-brand-navy">{formatCurrency(program.price)}</p>
            </div>
          </div>
          {(program.outcomes || []).length ? (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-brand-navy">{t('programs.outcomes')}</h2>
              <ul className="mt-4 grid gap-3">
                {getLocalizedList(program, 'outcomes', preferences.language).map((outcome) => (
                  <li key={outcome} className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-700">{outcome}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="mt-8">
            <ShareButtons title={program.title} text={program.summary || program.description} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-brand-navy">{myEnrolment ? t('programs.progressTitle') : 'Ready to start?'}</h2>
            {myEnrolment ? (
              <div className="mt-5 space-y-4">
                <ProgressBar value={myEnrolment.progress} label="Completion" />
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">{t('programs.progressLabel')}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressValue}
                    onChange={(event) => setProgressValue(event.target.value)}
                    className="w-full"
                  />
                </label>
                <button onClick={updateProgress} type="button" className="w-full rounded-2xl bg-brand-navy px-4 py-3 font-semibold text-white">
                  {t('common.update')}
                </button>
                <p className="text-sm text-slate-500">Last updated {formatDate(myEnrolment.lastAccessedAt)}</p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <p className="text-slate-600">Enrol in this pathway to unlock structured progress tracking and dashboard visibility.</p>
                <button onClick={enroll} type="button" className="w-full rounded-2xl bg-brand-green px-4 py-3 font-semibold text-white">
                  {t('programs.enroll')}
                </button>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-brand-navy">SEO keywords</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(program.seoKeywords || []).map((keyword) => (
                <span key={keyword} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-brand-navy">{t('programs.commentTitle')}</h2>
        <CommentPanel targetType="program" targetId={id} />
      </section>
    </div>
  );
};

export default ProgramDetailPage;
