import { useTheme } from '../context/ThemeContext';

export default function ThemePanel({ open, onClose }) {
  const { mode, setMode, accent, setAccent, accentColors } = useTheme();

  if (!open) return null;

  return (
    <>
      <div className="theme-overlay" onClick={onClose} />
      <div className="theme-panel">
        <div className="theme-panel-header">
          <h3>Darstellung</h3>
          <button className="theme-panel-close" onClick={onClose}>&times;</button>
        </div>

        {/* Mode Toggle */}
        <div className="theme-section">
          <span className="theme-section-label">Modus</span>
          <div className="theme-mode-toggle">
            <button
              className={`theme-mode-btn${mode === 'light' ? ' active' : ''}`}
              onClick={() => setMode('light')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              Light
            </button>
            <button
              className={`theme-mode-btn${mode === 'dark' ? ' active' : ''}`}
              onClick={() => setMode('dark')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
              </svg>
              Dark
            </button>
          </div>
        </div>

        {/* Accent Color */}
        <div className="theme-section">
          <span className="theme-section-label">Akzentfarbe</span>
          <div className="theme-accent-grid">
            {Object.entries(accentColors).map(([key, val]) => (
              <button
                key={key}
                className={`theme-accent-swatch${accent === key ? ' active' : ''}`}
                style={{ '--swatch': val.primary }}
                onClick={() => setAccent(key)}
                title={val.name}
              >
                <span className="swatch-dot" />
                <span className="swatch-label">{val.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
