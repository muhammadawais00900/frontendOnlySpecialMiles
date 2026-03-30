
export const safeJSONParse = (value, fallback = null) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const getStoredAuth = () => safeJSONParse(localStorage.getItem('specialMilesAuth'), null);

export const setStoredAuth = (value) => {
  if (!value) {
    localStorage.removeItem('specialMilesAuth');
    return;
  }
  localStorage.setItem('specialMilesAuth', JSON.stringify(value));
};

export const getStoredPreferences = () =>
  safeJSONParse(localStorage.getItem('specialMilesPreferences'), {
    language: 'en',
    textScale: 'normal',
    contrastMode: 'default',
    reducedMotion: false,
    emailNotifications: true,
    inAppNotifications: true,
    browserNotifications: false
  });

export const setStoredPreferences = (value) => {
  localStorage.setItem('specialMilesPreferences', JSON.stringify(value));
};
