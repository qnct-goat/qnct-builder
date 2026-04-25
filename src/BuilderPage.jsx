import { Link } from 'react-router-dom';
import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import { IconArrowLeft } from './components/Icons';

// Import Health template pages as raw HTML strings
import homeHtml from './templates/home.html?raw';
import aboutHtml from './templates/about.html?raw';
import servicesHtml from './templates/services.html?raw';
import blogHtml from './templates/blog.html?raw';
import contactHtml from './templates/contact.html?raw';

// CSS link tags to prepend to template HTML (loaded in canvas iframe)
const cssLinks = [
  '/assets/css/bootstrap.min.css',
  '/assets/css/owl.carousel.min.css',
  '/assets/css/flaticon.css',
  '/assets/css/animate.min.css',
  '/assets/css/fontawesome-all.min.css',
  '/assets/css/themify-icons.css',
  '/assets/css/slick.css',
  '/assets/css/nice-select.css',
  '/assets/css/style.css',
].map(href => `<link rel="stylesheet" href="${href}">`).join('\n');

const wrapWithStyles = (html) => `${cssLinks}\n${html}`;

const templatePages = [
  { name: 'Home', component: wrapWithStyles(homeHtml) },
  { name: 'About', component: wrapWithStyles(aboutHtml) },
  { name: 'Services', component: wrapWithStyles(servicesHtml) },
  { name: 'Blog', component: wrapWithStyles(blogHtml) },
  { name: 'Contact', component: wrapWithStyles(contactHtml) },
];

const defaultContent = {
  web: '<h1>Website</h1><p>Start building your website here.</p>',
  email: '<mjml><mj-body><mj-section><mj-column><mj-text>Your Newsletter</mj-text></mj-column></mj-section></mj-body></mjml>',
  document: '<h1>Document</h1><p>Start writing your document here.</p>',
};

export default function BuilderPage({ type, title }) {
  const isWebWithTemplate = type === 'web';
  const pages = isWebWithTemplate
    ? templatePages
    : [{ name: 'Main', component: defaultContent[type] || defaultContent.web }];

  return (
    <div className="builder-wrapper">
      {/* Topbar */}
      <div className="builder-topbar">
        <div className="builder-topbar-left">
          <Link to="/" className="builder-back-btn">
            <IconArrowLeft />
          </Link>
          <span className="builder-topbar-title">{title}</span>
        </div>
        <div className="builder-topbar-right">
          <button className="btn-glass">Vorschau</button>
          <button className="btn-accent">Speichern</button>
        </div>
      </div>

      {/* GrapesJS Editor */}
      <div className="builder-editor">
        <StudioEditor
          options={{
            licenseKey: import.meta.env.VITE_GRAPESJS_LICENSE_KEY,
            project: {
              type,
              default: { pages },
            },
            storage: {
              type: 'self',
              autosaveChanges: 5,
              onSave: (data) => {
                if (data) {
                  try { localStorage.setItem(`gjs-project-${type}`, JSON.stringify(data)); } catch {}
                }
              },
              onLoad: () => {
                try {
                  const data = localStorage.getItem(`gjs-project-${type}`);
                  return data ? JSON.parse(data) : undefined;
                } catch { return undefined; }
              },
            },
          }}
        />
      </div>
    </div>
  );
}
