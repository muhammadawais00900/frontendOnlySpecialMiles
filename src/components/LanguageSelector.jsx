
import { languageOptions } from '../data/translations';
import { usePreferences } from '../context/PreferencesContext';

const LanguageSelector = ({ onChange }) => {
  const { preferences, savePreferences, t } = usePreferences();

  const handleChange = async (event) => {
    const nextPreferences = { ...preferences, language: event.target.value };
    await savePreferences(nextPreferences);
    onChange?.(event.target.value);
  };

  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      <span className="sr-only">{t('common.language')}</span>
      <select
        value={preferences.language}
        onChange={handleChange}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
      >
        {languageOptions.map((language) => (
          <option key={language.code} value={language.code}>
            {language.nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelector;
