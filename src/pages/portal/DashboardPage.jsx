
import { useEffect, useState } from 'react';
import client from '../../api/client';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import MetricCard from '../../components/MetricCard';
import ProgramCard from '../../components/ProgramCard';
import ResourceCard from '../../components/ResourceCard';
import ProgressBar from '../../components/ProgressBar';
import TableCard from '../../components/TableCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import { formatDate, getRoleLabel } from '../../utils/helpers';

const DashboardPage = () => {
  const { t, preferences } = usePreferences();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useMeta({
    title: t('nav.dashboard'),
    description: 'Special Miles personalised dashboard for enrolments, bookings, messages, notifications and badges.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await client.get('/dashboard/overview');
        setOverview(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!overview) return <Alert variant="error">{error || 'Dashboard data could not be loaded.'}</Alert>;

  const metrics = [
    ['Enrolled programs', overview.stats.enrolledPrograms],
    ['Upcoming bookings', overview.stats.upcomingBookings],
    ['Average progress', `${overview.stats.averageProgress}%`],
    ['Resources available', overview.stats.availableResources],
    ['Unread messages', overview.stats.unreadMessages],
    ['Open tickets', overview.stats.openTickets]
  ];

  return (
    <div className="space-y-8">
      {error ? <Alert variant="warning">{error}</Alert> : null}
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">{t('nav.dashboard')}</h1>
        <p className="mt-2 text-slate-600">Your personalised overview brings together learning, bookings, support, community and engagement.</p>
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map(([label, value]) => <MetricCard key={label} label={label} value={value} />)}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-brand-navy">My progress</h2>
          <div className="mt-5 space-y-5">
            {overview.enrolments.map((item) => (
              <div key={item._id}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-brand-navy">{item.program?.title}</h3>
                    <p className="text-sm text-slate-500">{formatDate(item.lastAccessedAt)}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{item.status}</span>
                </div>
                <ProgressBar value={item.progress} label="Completion" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-brand-navy">Badges & leaderboard</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(overview.badges || []).map((badge) => (
              <div key={badge.key} className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-semibold text-brand-navy">{badge.label}</h3>
                <p className="mt-1 text-sm text-slate-500">{badge.description || 'Achievement unlocked'}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-green">Community leaderboard</h3>
            <div className="mt-3 space-y-3">
              {(overview.leaderboard || []).map((entry, index) => (
                <div key={entry._id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-medium text-brand-navy">#{index + 1} {entry.name}</p>
                    <p className="text-sm text-slate-500">{getRoleLabel(entry.role, preferences.language)}</p>
                  </div>
                  <span className="font-bold text-brand-green">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-brand-navy">Recommended programs</h2>
          <div className="grid gap-5">
            {overview.featuredPrograms.map((program) => <ProgramCard key={program._id} program={program} portal />)}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold text-brand-navy">Recommended resources</h2>
          <div className="grid gap-5">
            {overview.featuredResources.map((resource) => <ResourceCard key={resource._id} resource={resource} portal />)}
          </div>
        </div>
      </section>

      <TableCard
        title="Recent notifications"
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'message', label: 'Message' },
          { key: 'createdAt', label: 'Date', render: (row) => formatDate(row.createdAt) }
        ]}
        rows={overview.notifications}
      />
    </div>
  );
};

export default DashboardPage;
