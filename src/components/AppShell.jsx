
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AppShell = () => (
  <div className="min-h-screen bg-page lg:flex">
    <Sidebar />
    <div className="min-w-0 flex-1">
      <Topbar />
      <main className="px-4 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AppShell;
