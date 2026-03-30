
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import { usePreferences } from '../context/PreferencesContext';
import { useAuth } from '../context/AuthContext';

const MobileMenu = () => {
  const { t } = usePreferences();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    ['/portal/dashboard', t('nav.dashboard')],
    ['/portal/programs', t('nav.programs')],
    ['/portal/resources', t('nav.resources')],
    ['/portal/bookings', t('nav.bookings')],
    ['/portal/messages', t('nav.messages')],
    ['/portal/notifications', t('nav.notifications')],
    ['/portal/support', t('nav.support')],
    ['/portal/profile', t('nav.profile')],
    ['/portal/settings', t('nav.settings')]
  ];

  if (user?.role === 'admin') links.push(['/portal/admin', t('nav.admin')]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-soft"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="absolute inset-x-4 top-20 z-50 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft">
          <Link to="/" onClick={() => setOpen(false)} className="block border-b border-slate-100 pb-4">
            <Logo compact />
          </Link>
          <div className="mt-4 space-y-2">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-brand-navy text-white' : 'text-slate-700 hover:bg-slate-100'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MobileMenu;
