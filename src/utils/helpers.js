import { languageOptions, translations } from '../data/translations';
import { getCatalogTranslation } from '../data/catalogTranslations';

export const clsx = (...values) => values.filter(Boolean).join(' ');

export const formatDate = (value) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value));
};

export const formatDateTime = (value) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
};

export const formatCurrency = (value = 0) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);

export const getLanguageMeta = (code) =>
  languageOptions.find((item) => item.code === code) || languageOptions[0];

export const getRoleLabel = (role, language = 'en') =>
  translations[language]?.roles?.[role] || translations.en.roles?.[role] || role;

export const getCategoryLabel = (category, language = 'en') =>
  translations[language]?.categories?.[category] || translations.en.categories?.[category] || category;

export const createOptionsFromPrograms = (programs = []) =>
  programs.map((program) => ({ value: program._id, label: program.title }));

export const getLocalizedField = (item, field, language = 'en') => {
  if (!item) return '';
  const catalogType = item.price !== undefined ? 'programs' : 'resources';
  const catalog = getCatalogTranslation(language, catalogType, item.slug);
  if (catalog?.[field]) return catalog[field];
  const variant = `${field}_${language}`;
  if (item[variant]) return item[variant];
  return item[field] || '';
};

export const getLocalizedList = (item, field, language = 'en') => {
  const catalogType = item?.price !== undefined ? 'programs' : 'resources';
  const catalog = getCatalogTranslation(language, catalogType, item?.slug);
  if (Array.isArray(catalog?.[field])) return catalog[field];
  return item?.[field] || [];
};

export const truncate = (value = '', max = 160) =>
  value.length > max ? `${value.slice(0, max - 1)}…` : value;

export const toSentenceCase = (value = '') =>
  value
    .split('-')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');
