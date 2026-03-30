
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import { useMeta } from '../../hooks/useMeta';

const LoginPage = () => {
  const { login } = useAuth();
  const { t } = usePreferences();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useMeta({
    title: t('nav.login'),
    description: 'Sign in to the Special Miles portal to manage programs, bookings, messages, support and settings.'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await login(form);
      navigate(location.state?.from || '/portal/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold text-brand-navy">{t('auth.loginTitle')}</h1>
        <p className="mt-3 text-slate-600">Access your multilingual dashboard, bookings, messages and resources.</p>
        {error ? <div className="mt-5"><Alert variant="error">{error}</Alert></div> : null}
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.email')}</span>
            <input type="email" required value={form.email} onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))} className="input" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.password')}</span>
            <input type="password" required value={form.password} onChange={(e) => setForm((c) => ({ ...c, password: e.target.value }))} className="input" />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <Link to="/reset-password" className="font-semibold text-brand-green">{t('auth.forgotPassword')}</Link>
          <span className="text-slate-500">{t('auth.needAccount')} <Link to="/register" className="font-semibold text-brand-navy">{t('auth.createAccount')}</Link></span>
        </div>
        <button type="submit" disabled={submitting} className="mt-6 w-full rounded-2xl bg-brand-navy px-5 py-3 font-semibold text-white disabled:opacity-60">
          {submitting ? 'Signing in…' : t('auth.signIn')}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
