
import { useState } from 'react';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import Alert from '../../components/Alert';
import LanguageSelector from '../../components/LanguageSelector';
import SectionHeader from '../../components/SectionHeader';

const SettingsPage = () => {
  const { t, preferences, savePreferences, requestBrowserNotifications } = usePreferences();
  const [draft, setDraft] = useState(preferences);
  const [feedback, setFeedback] = useState(null);

  useMeta({
    title: t('nav.settings'),
    description: 'Change language, accessibility and notification preferences for the entire Special Miles experience.'
  });

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await savePreferences(draft);
      setFeedback({ type: 'success', message: 'Settings updated across the entire website.' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }));

  const enableBrowserNotifications = async () => {
    const permission = await requestBrowserNotifications();
    if (permission === 'granted') {
      update('browserNotifications', true)
      setFeedback({ type: 'success', message: 'Browser notifications enabled.' });
    } else if (permission === 'denied') {
      setFeedback({ type: 'warning', message: 'Browser notifications were denied in your browser.' });
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader title={t('settings.title')} description={t('settings.subtitle')} />
      {feedback ? <Alert variant={feedback.type}>{feedback.message}</Alert> : null}
      <form onSubmit={handleSave} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-brand-navy">{t('common.language')}</h2>
            <p className="mt-2 text-sm text-slate-600">Choose a language. Arabic switches the interface into right-to-left mode automatically.</p>
            <div className="mt-4">
              <LanguageSelector onChange={(value) => update('language', value)} />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-brand-navy">{t('settings.textScale')}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {['normal', 'large', 'xlarge'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => update('textScale', size)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${draft.textScale === size ? 'bg-brand-navy text-white' : 'bg-white text-slate-700'}`}
                >
                  {t(`settings.${size}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-brand-navy">{t('settings.contrast')}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {['default', 'high'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => update('contrastMode', mode)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${draft.contrastMode === mode ? 'bg-brand-navy text-white' : 'bg-white text-slate-700'}`}
                >
                  {mode === 'default' ? t('settings.defaultContrast') : t('settings.highContrast')}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-brand-navy">Motion & notifications</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <label className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                <span>{t('settings.reducedMotion')}</span>
                <input type="checkbox" checked={draft.reducedMotion} onChange={(e) => update('reducedMotion', e.target.checked)} />
              </label>
              <label className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                <span>{t('settings.emailNotifications')}</span>
                <input type="checkbox" checked={draft.emailNotifications} onChange={(e) => update('emailNotifications', e.target.checked)} />
              </label>
              <label className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                <span>{t('settings.inAppNotifications')}</span>
                <input type="checkbox" checked={draft.inAppNotifications} onChange={(e) => update('inAppNotifications', e.target.checked)} />
              </label>
              <button type="button" onClick={enableBrowserNotifications} className="w-full rounded-2xl bg-white px-4 py-3 text-left font-medium text-slate-700">
                {t('settings.browserNotifications')}
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="mt-6 rounded-2xl bg-brand-green px-5 py-3 font-semibold text-white">
          {t('common.save')}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
