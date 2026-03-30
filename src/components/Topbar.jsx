
import { Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';

const Topbar = () => {
  const { user, logout } = useAuth();
  const { t } = usePreferences();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <div>
            <p className="text-sm text-slate-500">Signed in as</p>
            <h1 className="text-lg font-semibold text-brand-navy">{user?.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link
            to="/portal/notifications"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
          >
            <Bell className="h-4 w-4" />
            {t('nav.notifications')}
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white"
          >
            <LogOut className="h-4 w-4" />
            {t('nav.logout')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
