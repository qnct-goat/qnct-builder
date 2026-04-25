import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ACCENT_COLORS = {
  skyblue:  { name: 'Himmelblau', primary: '#60A5FA', light: '#93C5FD', glow: 'rgba(96,165,250,0.3)',  surface: 'rgba(96,165,250,0.08)' },
  lilac:    { name: 'Flieder',    primary: '#B8A9E8', light: '#D4C9F5', glow: 'rgba(184,169,232,0.3)', surface: 'rgba(184,169,232,0.08)' },
  pink:     { name: 'Rosa',       primary: '#F9A8D4', light: '#FBCFE8', glow: 'rgba(249,168,212,0.3)', surface: 'rgba(249,168,212,0.08)' },
  purple:   { name: 'Lila',       primary: '#A78BFA', light: '#C4B5FD', glow: 'rgba(167,139,250,0.3)', surface: 'rgba(167,139,250,0.08)' },
  mint:     { name: 'Mint',       primary: '#6EE7B7', light: '#A7F3D0', glow: 'rgba(110,231,183,0.3)', surface: 'rgba(110,231,183,0.08)' },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try { return window.__qnctThemeMode || 'dark'; } catch { return 'dark'; }
  });
  const [accent, setAccent] = useState(() => {
    try { return window.__qnctThemeAccent || 'purple'; } catch { return 'purple'; }
  });

  const applyTheme = useCallback((m, a) => {
    const root = document.documentElement;
    const colors = ACCENT_COLORS[a] || ACCENT_COLORS.purple;

    root.setAttribute('data-theme', m);
    root.style.setProperty('--accent', colors.primary);
    root.style.setProperty('--accent-light', colors.light);
    root.style.setProperty('--accent-glow', colors.glow);
    root.style.setProperty('--accent-surface', colors.surface);

    // Persist
    try {
      window.__qnctThemeMode = m;
      window.__qnctThemeAccent = a;
    } catch {}
  }, []);

  useEffect(() => { applyTheme(mode, accent); }, [mode, accent, applyTheme]);

  const toggleMode = () => setMode(m => m === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, toggleMode, setAccent, accentColors: ACCENT_COLORS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export { ACCENT_COLORS };
