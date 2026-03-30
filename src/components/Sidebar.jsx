
import { Link, NavLink } from 'react-router-dom';
import { BarChart3, Bell, BookOpen, BriefcaseBusiness, FolderKanban, LifeBuoy, MessageSquare, Settings, Shield, UserCircle2 } from 'lucide-react';
import Logo from './Logo';
import { usePreferences } from '../context/PreferencesContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { t } = usePreferences();
  const { user } = useAuth();

  const links = [
    { to: '/portal/dashboard', label: t('nav.dashboard'), icon: BarChart3 },
    { to: '/portal/programs', label: t('nav.programs'), icon: BookOpen },
    { to: '/portal/resources', label: t('nav.resources'), icon: FolderKanban },
    { to: '/portal/bookings', label: t('nav.bookings'), icon: BriefcaseBusiness },
    { to: '/portal/messages', label: t('nav.messages'), icon: MessageSquare },
    { to: '/portal/notifications', label: t('nav.notifications'), icon: Bell },
    { to: '/portal/support', label: t('nav.support'), icon: LifeBuoy },
    { to: '/portal/profile', label: t('nav.profile'), icon: UserCircle2 },
    { to: '/portal/settings', label: t('nav.settings'), icon: Settings }
  ];

  if (user?.role === 'admin') {
    links.push({ to: '/portal/admin', label: t('nav.admin'), icon: Shield });
  }

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white px-6 py-8 lg:block">
      <Link to="/" className="block">
        <Logo />
      </Link>
      <nav className="mt-10 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
