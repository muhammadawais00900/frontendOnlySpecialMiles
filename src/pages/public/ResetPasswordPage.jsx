
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import { useMeta } from '../../hooks/useMeta';

const ResetPasswordPage = () => {
  const { forgotPassword, resetPassword } = useAuth();
  const { t } = usePreferences();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [step, setStep] = useState(params.get('token') ? 'reset' : 'request');
  const [requestEmail, setRequestEmail] = useState(params.get('email') || '');
  const [resetForm, setResetForm] = useState({
    email: params.get('email') || '',
    token: params.get('token') || '',
    password: ''
  });
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useMeta({
    title: t('auth.forgotTitle'),
    description: 'Request a password reset or complete the reset process for your Special Miles account.'
  });

  const handleRequest = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const data = await forgotPassword({ email: requestEmail });
      setFeedback({ type: 'success', message: data.resetLink ? `Development reset link: ${data.resetLink}` : data.message });
      setStep('reset');
      setResetForm((current) => ({ ...current, email: requestEmail }));
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const data = await resetPassword(resetForm);
      setFeedback({ type: 'success', message: data.message });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold text-brand-navy">{t('auth.forgotTitle')}</h1>
        <p className="mt-3 text-slate-600">{t('auth.forgotDescription')}</p>
        {feedback ? <div className="mt-5"><Alert variant={feedback.type}>{feedback.message}</Alert></div> : null}

        {step === 'request' ? (
          <form onSubmit={handleRequest} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.email')}</span>
              <input type="email" value={requestEmail} onChange={(e) => setRequestEmail(e.target.value)} className="input" required />
            </label>
            <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-brand-navy px-5 py-3 font-semibold text-white disabled:opacity-60">
              {submitting ? 'Preparing…' : t('auth.sendReset')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.email')}</span>
              <input type="email" value={resetForm.email} onChange={(e) => setResetForm((c) => ({ ...c, email: e.target.value }))} className="input" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.resetToken')}</span>
              <input value={resetForm.token} onChange={(e) => setResetForm((c) => ({ ...c, token: e.target.value }))} className="input" required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{t('auth.password')}</span>
              <input type="password" value={resetForm.password} onChange={(e) => setResetForm((c) => ({ ...c, password: e.target.value }))} className="input" required />
            </label>
            <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-brand-green px-5 py-3 font-semibold text-white disabled:opacity-60">
              {submitting ? 'Updating…' : t('auth.setNewPassword')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
