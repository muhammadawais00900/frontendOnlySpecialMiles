
import { useEffect, useState } from 'react';
import client from '../../api/client';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import TableCard from '../../components/TableCard';
import SectionHeader from '../../components/SectionHeader';
import LoadingSpinner from '../../components/LoadingSpinner';

const initialForm = {
  program: '',
  sessionType: 'Consultation',
  preferredDate: '',
  preferredTime: '10:00',
  meetingMode: 'online',
  paymentMethod: 'simulated',
  notes: ''
};

const BookingsPage = () => {
  const { t } = usePreferences();
  const [programs, setPrograms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useMeta({
    title: t('nav.bookings'),
    description: 'Create and review consultancy bookings inside the Special Miles portal.'
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [{ data: programsData }, { data: bookingsData }] = await Promise.all([
        client.get('/programs'),
        client.get('/bookings/my')
      ]);
      setPrograms(programsData);
      setBookings(bookingsData);
      if (!form.program && programsData[0]?._id) {
        setForm((current) => ({ ...current, program: programsData[0]._id }));
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const selectedProgram = programs.find((item) => item._id === form.program);
      const payload = {
        ...form,
        paymentStatus: 'simulated-paid',
        price: selectedProgram?.price || 0
      };
      const { data } = await client.post('/bookings', payload);
      setBookings((current) => [data, ...current]);
      setFeedback({ type: 'success', message: 'Booking created successfully.' });
      setForm((current) => ({ ...initialForm, program: current.program }));
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <SectionHeader title={t('nav.bookings')} description={t('bookings.subtitle')} />
      {feedback ? <Alert variant={feedback.type}>{feedback.message}</Alert> : null}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-brand-navy">{t('bookings.createTitle')}</h2>
          <div className="mt-5 grid gap-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Program / service</span>
              <select value={form.program} onChange={(e) => setForm((c) => ({ ...c, program: e.target.value }))} className="input">
                {programs.map((program) => <option key={program._id} value={program._id}>{program.title}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('bookings.sessionType')}</span>
              <input value={form.sessionType} onChange={(e) => setForm((c) => ({ ...c, sessionType: e.target.value }))} className="input" />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">{t('bookings.preferredDate')}</span>
                <input type="date" value={form.preferredDate} onChange={(e) => setForm((c) => ({ ...c, preferredDate: e.target.value }))} className="input" required />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">{t('bookings.preferredTime')}</span>
                <input value={form.preferredTime} onChange={(e) => setForm((c) => ({ ...c, preferredTime: e.target.value }))} className="input" required />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('bookings.meetingMode')}</span>
              <select value={form.meetingMode} onChange={(e) => setForm((c) => ({ ...c, meetingMode: e.target.value }))} className="input">
                <option value="online">{t('common.online')}</option>
                <option value="in-person">{t('common.inPerson')}</option>
                <option value="hybrid">{t('common.hybrid')}</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('bookings.notes')}</span>
              <textarea value={form.notes} onChange={(e) => setForm((c) => ({ ...c, notes: e.target.value }))} rows={4} className="input min-h-[120px]" />
            </label>
          </div>
          <button type="submit" disabled={submitting} className="mt-6 w-full rounded-2xl bg-brand-green px-5 py-3 font-semibold text-white disabled:opacity-60">
            {submitting ? 'Booking…' : t('bookings.book')}
          </button>
        </form>

        <TableCard
          title={t('bookings.myBookings')}
          columns={[
            { key: 'referenceCode', label: t('bookings.reference') },
            { key: 'sessionType', label: t('bookings.sessionType') },
            { key: 'preferredDate', label: t('bookings.preferredDate'), render: (row) => formatDate(row.preferredDate) },
            { key: 'bookingStatus', label: t('common.status') },
            { key: 'price', label: 'Price', render: (row) => formatCurrency(row.price || 0) }
          ]}
          rows={bookings}
        />
      </div>
    </div>
  );
};

export default BookingsPage;
