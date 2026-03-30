
import { useEffect, useState } from 'react';
import client from '../../api/client';
import { formatDateTime, toSentenceCase } from '../../utils/helpers';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import SectionHeader from '../../components/SectionHeader';
import TableCard from '../../components/TableCard';

const initialForm = {
  category: 'general',
  priority: 'medium',
  subject: '',
  message: ''
};

const SupportPage = () => {
  const { t } = usePreferences();
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useMeta({
    title: t('nav.support'),
    description: 'Create and review Special Miles support tickets.'
  });

  const loadTickets = async () => {
    const { data } = await client.get('/tickets/my');
    setTickets(data);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await loadTickets();
      } catch (err) {
        setFeedback({ type: 'error', message: err.message });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await client.post('/tickets', form);
      setForm(initialForm);
      setFeedback({ type: 'success', message: 'Support request created.' });
      await loadTickets();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <SectionHeader title={t('nav.support')} description={t('support.subtitle')} />
      {feedback ? <Alert variant={feedback.type}>{feedback.message}</Alert> : null}
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-brand-navy">{t('support.create')}</h2>
          <div className="mt-5 grid gap-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('support.category')}</span>
              <select value={form.category} onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))} className="input">
                {['general', 'booking', 'technical', 'billing', 'accessibility', 'program'].map((item) => (
                  <option key={item} value={item}>{t(`categories.${item}`)}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('common.priority')}</span>
              <select value={form.priority} onChange={(e) => setForm((c) => ({ ...c, priority: e.target.value }))} className="input">
                <option value="low">{t('common.low')}</option>
                <option value="medium">{t('common.medium')}</option>
                <option value="high">{t('common.high')}</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('support.subject')}</span>
              <input value={form.subject} onChange={(e) => setForm((c) => ({ ...c, subject: e.target.value }))} className="input" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('support.message')}</span>
              <textarea value={form.message} onChange={(e) => setForm((c) => ({ ...c, message: e.target.value }))} rows={6} className="input min-h-[160px]" required />
            </label>
          </div>
          <button type="submit" className="mt-6 w-full rounded-2xl bg-brand-green px-4 py-3 font-semibold text-white">
            {t('support.create')}
          </button>
        </form>

        <TableCard
          title={t('support.myTickets')}
          columns={[
            { key: 'subject', label: t('support.subject') },
            { key: 'category', label: t('support.category'), render: (row) => t(`categories.${row.category}`) },
            { key: 'status', label: t('common.status'), render: (row) => toSentenceCase(row.status) },
            { key: 'updatedAt', label: 'Updated', render: (row) => formatDateTime(row.updatedAt) }
          ]}
          rows={tickets}
        />
      </div>
    </div>
  );
};

export default SupportPage;
