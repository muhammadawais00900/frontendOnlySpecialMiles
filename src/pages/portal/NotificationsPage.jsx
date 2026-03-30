
import { useEffect, useState } from 'react';
import client from '../../api/client';
import { formatDateTime } from '../../utils/helpers';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import SectionHeader from '../../components/SectionHeader';

const NotificationsPage = () => {
  const { t } = usePreferences();
  const [notifications, setNotifications] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useMeta({
    title: t('nav.notifications'),
    description: 'Review and manage your Special Miles in-app notifications.'
  });

  const loadNotifications = async () => {
    const { data } = await client.get('/notifications');
    setNotifications(data);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await loadNotifications();
      } catch (err) {
        setFeedback({ type: 'error', message: err.message });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const markAll = async () => {
    try {
      await client.patch('/notifications/mark-all-read');
      await loadNotifications();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  const markOne = async (id) => {
    try {
      await client.patch(`/notifications/${id}/read`);
      await loadNotifications();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionHeader title={t('nav.notifications')} description={t('notifications.subtitle')} action={<button type="button" onClick={markAll} className="rounded-2xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white">{t('notifications.markAll')}</button>} />
      {feedback ? <Alert variant={feedback.type}>{feedback.message}</Alert> : null}
      <div className="grid gap-4">
        {notifications.map((item) => (
          <article key={item._id} className={`rounded-3xl border p-5 shadow-soft ${item.readAt ? 'border-slate-200 bg-white' : 'border-brand-green/30 bg-brand-green/5'}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-brand-navy">{item.title}</h2>
                <p className="mt-2 text-slate-600">{item.message}</p>
                <p className="mt-3 text-sm text-slate-500">{formatDateTime(item.createdAt)}</p>
              </div>
              {!item.readAt ? <button type="button" onClick={() => markOne(item._id)} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Mark as read</button> : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
