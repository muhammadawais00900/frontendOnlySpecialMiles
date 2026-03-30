
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredPreferences, setStoredPreferences } from '../utils/storage';
import { getLanguageMeta } from '../utils/helpers';
import { translations } from '../data/translations';
import { useAuth } from './AuthContext';
import client from '../api/client';

const PreferencesContext = createContext(null);

export const PreferencesProvider = ({ children }) => {
  const { user, isAuthenticated, updateStoredUser } = useAuth();
  const [preferences, setPreferences] = useState(() => ({
    ...getStoredPreferences(),
    ...(user?.preferences || {})
  }));

  useEffect(() => {
    if (user?.preferences) {
      setPreferences((current) => ({ ...current, ...user.preferences }));
    }
  }, [user]);

  useEffect(() => {
    setStoredPreferences(preferences);
    const meta = getLanguageMeta(preferences.language);
    document.documentElement.lang = preferences.language;
    document.documentElement.dir = meta.dir;
    document.documentElement.dataset.contrast = preferences.contrastMode;
    document.documentElement.dataset.textScale = preferences.textScale;
    document.documentElement.dataset.motion = preferences.reducedMotion ? 'reduced' : 'default';
  }, [preferences]);

  const savePreferences = async (nextPreferences) => {
    setPreferences(nextPreferences);
    setStoredPreferences(nextPreferences);

    if (isAuthenticated) {
      const { data } = await client.put('/users/profile', {
        preferences: {
          language: nextPreferences.language,
          textScale: nextPreferences.textScale,
          contrastMode: nextPreferences.contrastMode,
          reducedMotion: nextPreferences.reducedMotion,
          emailNotifications: nextPreferences.emailNotifications,
          inAppNotifications: nextPreferences.inAppNotifications
        }
      });
      updateStoredUser(data);
    }
  };

  const requestBrowserNotifications = async () => {
    if (!('Notification' in window)) return 'unsupported';
    const permission = await Notification.requestPermission();
    const next = { ...preferences, browserNotifications: permission === 'granted' };
    setPreferences(next);
    setStoredPreferences(next);
    return permission;
  };

  const t = (path) => {
    const active = translations[preferences.language] || translations.en;
    return path.split('.').reduce((acc, key) => acc?.[key], active) ??
      path.split('.').reduce((acc, key) => acc?.[key], translations.en) ??
      path;
  };

  const value = useMemo(
    () => ({
      preferences,
      setPreferences,
      savePreferences,
      requestBrowserNotifications,
      t
    }),
    [preferences]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used inside PreferencesProvider');
  }
  return context;
};
