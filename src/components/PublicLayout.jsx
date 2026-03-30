import { Link, NavLink, Outlet } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Menu, X, Youtube } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import { usePreferences } from '../context/PreferencesContext';
import { useAuth } from '../context/AuthContext';
import { useSiteContent } from '../hooks/useSiteContent';

const PublicLayout = () => {
  const { t } = usePreferences();
  const { isAuthenticated } = useAuth();
  const { siteContent } = useSiteContent();
  const [open, setOpen] = useState(false);

  const navItems = [
    ['/', t('nav.home')],
    ['/about', t('nav.about')],
    ['/programs', t('nav.programs')],
    ['/awards', t('nav.awards')],
    ['/faq', t('nav.faq')],
    ['/contact', t('nav.contact')]
  ];

  const socials = [
    ['facebook', Facebook],
    ['instagram', Instagram],
    ['linkedin', Linkedin],
    ['youtube', Youtube]
  ];

  return (
    <div className="min-h-screen bg-page">
      {siteContent?.announcement ? (
        <div className="bg-brand-700 px-4 py-3 text-center text-sm text-white">
          <span className="font-semibold">{t('home.announcementLabel')}:</span> {siteContent.announcement}
        </div>
      ) : null}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-brand-700' : 'text-slate-600 hover:text-brand-700'}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSelector />
            {isAuthenticated ? (
              <Link to="/portal/dashboard" className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                {t('nav.dashboard')}
              </Link>
            ) : (
              <>
                <Link to="/login" className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-200 hover:text-brand-700">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>

          <button type="button" onClick={() => setOpen((current) => !current)} className="rounded-2xl border border-slate-200 p-3 lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="space-y-2">
              {navItems.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `block rounded-2xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-brand-600 text-white' : 'text-slate-700 hover:bg-brand-50'}`}
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <LanguageSelector />
              <Link to={isAuthenticated ? '/portal/dashboard' : '/login'} className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
                {isAuthenticated ? t('nav.dashboard') : t('nav.login')}
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">{t('footer.tagline')}</p>
            <div className="mt-5 flex gap-3">
              {socials.map(([key, Icon]) =>
                siteContent?.socialLinks?.[key] ? (
                  <a key={key} href={siteContent.socialLinks[key]} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:border-brand-200 hover:text-brand-700">
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{t('common.all')}</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <Link to="/privacy" className="block hover:text-brand-navy">{t('nav.privacy')}</Link>
              <Link to="/terms" className="block hover:text-brand-navy">{t('nav.terms')}</Link>
              <Link to="/refund" className="block hover:text-brand-navy">{t('nav.refund')}</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{t('nav.contact')}</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>{siteContent?.supportEmail || 'hello@specialmiles.org'}</p>
              <p>{siteContent?.supportPhone || '+61 000 000 000'}</p>
              {(siteContent?.locations || []).map((location) => (
                <p key={location}>{location}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 px-4 py-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Special Miles. {t('footer.rights')}
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
