import { Link } from 'react-router-dom';
import { IconGlobe, IconMail, IconFile, IconPlus, IconLayers, IconImage, IconGrid } from './Icons';

const BUILDERS = [
  {
    to: '/website',
    icon: IconGlobe,
    label: 'Website Builder',
    desc: 'Drag & Drop Websites gestalten',
    gradient: 'var(--card-gradient-1)',
    pages: 5,
    status: 'live',
  },
  {
    to: '/newsletter',
    icon: IconMail,
    label: 'Newsletter',
    desc: 'E-Mail Templates erstellen',
    gradient: 'var(--card-gradient-2)',
    pages: 0,
    status: 'draft',
  },
  {
    to: '/docs',
    icon: IconFile,
    label: 'Dokumente',
    desc: 'Dokumente & PDFs bauen',
    gradient: 'var(--card-gradient-3)',
    pages: 0,
    status: 'draft',
  },
];

const QUICK_ACTIONS = [
  { icon: IconLayers, label: 'Templates', desc: 'Vorlagen durchsuchen', color: 'purple' },
  { icon: IconImage,  label: 'Assets',    desc: 'Bilder & Medien',      color: 'blue' },
  { icon: IconGrid,   label: 'Blöcke',    desc: 'Wiederverwendbare Teile', color: 'mint' },
];

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Guten Morgen' : hour < 18 ? 'Guten Tag' : 'Guten Abend';

  return (
    <div className="dashboard">
      {/* Greeting */}
      <div className="dashboard-greeting animate-in">
        <h1>{greeting}</h1>
        <p>Willkommen im QNCT Builder. Was soll heute entstehen?</p>
      </div>

      {/* Floating Builder Tiles */}
      <section className="section animate-in">
        <div className="section-header">
          <h2 className="section-title">Projekte</h2>
        </div>
        <div className="tiles-grid">
          {BUILDERS.map((b) => (
            <Link to={b.to} key={b.to} className="tile">
              <div className="tile-preview" style={{ background: b.gradient }}>
                <div className="tile-preview-icon"><b.icon width="32" height="32" /></div>
                <span className={`tile-status ${b.status}`}>
                  <span className="tile-status-dot" />
                  {b.status === 'live' ? 'Live' : 'Entwurf'}
                </span>
              </div>
              <div className="tile-body">
                <h3 className="tile-name">{b.label}</h3>
                <p className="tile-desc">{b.desc}</p>
                {b.pages > 0 && <span className="tile-meta">{b.pages} Seiten</span>}
              </div>
            </Link>
          ))}

          {/* New project tile */}
          <Link to="/website" className="tile tile-new">
            <div className="tile-new-inner">
              <div className="tile-new-icon"><IconPlus width="24" height="24" /></div>
              <span className="tile-new-label">Neues Projekt</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section animate-in">
        <div className="section-header">
          <h2 className="section-title">Schnellzugriff</h2>
        </div>
        <div className="actions-row">
          {QUICK_ACTIONS.map((a) => (
            <div key={a.label} className="action-tile">
              <div className={`action-tile-icon ${a.color}`}>
                <a.icon />
              </div>
              <div>
                <h4 className="action-tile-label">{a.label}</h4>
                <p className="action-tile-desc">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="section animate-in">
        <div className="section-header">
          <h2 className="section-title">Zuletzt bearbeitet</h2>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-dot" />
            <div className="activity-text">
              <span className="activity-title">Healthcouch Template</span>
              <span className="activity-time">Heute</span>
            </div>
            <span className="activity-type">Website</span>
          </div>
        </div>
      </section>
    </div>
  );
}
