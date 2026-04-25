import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { IconHome, IconGlobe, IconMail, IconFile, IconPalette, IconSun, IconMoon } from './Icons';

const NAV_ITEMS = [
  { to: '/',           icon: IconHome,  label: 'Dashboard' },
  { to: '/website',    icon: IconGlobe, label: 'Website' },
  { to: '/newsletter', icon: IconMail,  label: 'Newsletter' },
  { to: '/docs',       icon: IconFile,  label: 'Dokumente' },
];

export default function Sidebar({ onThemeOpen }) {
  const { mode, toggleMode } = useTheme();
  const location = useLocation();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">Q</div>
        <div className="sidebar-brand">
          <span className="sidebar-brand-name">QNCT</span>
          <span className="sidebar-brand-label">Builder</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <span className="nav-section-label">Workspace</span>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon"><Icon /></span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="nav-item" onClick={onThemeOpen} style={{ width: '100%', border: 'none', background: 'none', fontFamily: 'inherit' }}>
          <span className="nav-icon"><IconPalette /></span>
          <span>Anpassen</span>
        </button>
        <button className="nav-item" onClick={toggleMode} style={{ width: '100%', border: 'none', background: 'none', fontFamily: 'inherit' }}>
          <span className="nav-icon">{mode === 'dark' ? <IconSun /> : <IconMoon />}</span>
          <span>{mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
}
