import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import ThemePanel from './ThemePanel';

export default function Layout() {
  const [themeOpen, setThemeOpen] = useState(false);
  const location = useLocation();
  const isEditor = ['/website', '/newsletter', '/docs'].includes(location.pathname);

  return (
    <div className="app-shell">
      {/* Ambient background orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      <Sidebar onThemeOpen={() => setThemeOpen(true)} />

      <main className={`main-content${isEditor ? ' editor-mode' : ''}`}>
        <Outlet />
      </main>

      <ThemePanel open={themeOpen} onClose={() => setThemeOpen(false)} />
    </div>
  );
}
