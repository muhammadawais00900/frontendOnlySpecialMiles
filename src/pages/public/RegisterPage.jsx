
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import { useMeta } from '../../hooks/useMeta';

const RegisterPage = () => {
  const { register } = useAuth();
  const { t } = usePreferences();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organisationName: '',
    role: 'parent',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useMeta({
    title: t('nav.register'),
    description: 'Create a Special Miles account for parents, educators, students or organisations.'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const payload = { ...form };
      delete payload.confirmPassword;
      await register(payload);
      navigate('/portal/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold text-brand-navy">{t('auth.registerTitle')}</h1>
        <p className="mt-3 text-slate-600">Create a secure account and personalise your language and accessibility settings later in the portal.</p>
        {error ? <div className="mt-5"><Alert variant="error">{error}</Alert></div> : null}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.name')}</span>
            <input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} className="input" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.email')}</span>
            <input type="email" value={form.email} onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))} className="input" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.phone')}</span>
            <input value={form.phone} onChange={(e) => setForm((c) => ({ ...c, phone: e.target.value }))} className="input" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.organisationName')}</span>
            <input value={form.organisationName} onChange={(e) => setForm((c) => ({ ...c, organisationName: e.target.value }))} className="input" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.role')}</span>
            <select value={form.role} onChange={(e) => setForm((c) => ({ ...c, role: e.target.value }))} className="input">
              <option value="parent">Parent</option>
              <option value="educator">Educator</option>
              <option value="student">Student</option>
              <option value="organisation">Organisation</option>
            </select>
          </label>
          <div />
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.password')}</span>
            <input type="password" value={form.password} onChange={(e) => setForm((c) => ({ ...c, password: e.target.value }))} className="input" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.confirmPassword')}</span>
            <input type="password" value={form.confirmPassword} onChange={(e) => setForm((c) => ({ ...c, confirmPassword: e.target.value }))} className="input" required />
          </label>
        </div>
        <div className="mt-5 text-sm text-slate-500">
          {t('auth.alreadyHaveAccount')} <Link to="/login" className="font-semibold text-brand-navy">{t('auth.signIn')}</Link>
        </div>
        <button type="submit" disabled={submitting} className="mt-6 w-full rounded-2xl bg-brand-green px-5 py-3 font-semibold text-white disabled:opacity-60">
          {submitting ? 'Creating…' : t('auth.createAccount')}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
