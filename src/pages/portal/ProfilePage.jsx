
import { useState } from 'react';
import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import SectionHeader from '../../components/SectionHeader';

const ProfilePage = () => {
  const { user, updateStoredUser } = useAuth();
  const { t } = usePreferences();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    organisationName: user?.organisationName || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    password: ''
  });
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useMeta({
    title: t('nav.profile'),
    description: 'Update your Special Miles profile details and security settings.'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      const { data } = await client.put('/users/profile', payload);
      updateStoredUser(data);
      setFeedback({ type: 'success', message: 'Profile updated successfully.' });
      setForm((current) => ({ ...current, password: '' }));
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader title={t('nav.profile')} description={t('profile.subtitle')} />
      {feedback ? <Alert variant={feedback.type}>{feedback.message}</Alert> : null}
      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('profile.name')}</span>
            <input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} className="input" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('profile.phone')}</span>
            <input value={form.phone} onChange={(e) => setForm((c) => ({ ...c, phone: e.target.value }))} className="input" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('profile.organisation')}</span>
            <input value={form.organisationName} onChange={(e) => setForm((c) => ({ ...c, organisationName: e.target.value }))} className="input" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Avatar URL</span>
            <input value={form.avatar} onChange={(e) => setForm((c) => ({ ...c, avatar: e.target.value }))} className="input" />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t('profile.bio')}</span>
          <textarea value={form.bio} onChange={(e) => setForm((c) => ({ ...c, bio: e.target.value }))} rows={6} className="input min-h-[140px]" />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t('profile.password')}</span>
          <input type="password" value={form.password} onChange={(e) => setForm((c) => ({ ...c, password: e.target.value }))} className="input" />
        </label>
        <button type="submit" disabled={submitting} className="mt-6 rounded-2xl bg-brand-navy px-5 py-3 font-semibold text-white disabled:opacity-60">
          {submitting ? 'Saving…' : t('common.save')}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
