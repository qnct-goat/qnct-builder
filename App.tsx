import { useEffect, useRef } from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
// @ts-ignore
import blocksBasic from 'grapesjs-blocks-basic'
// @ts-ignore
import presetsWebpage from 'grapesjs-preset-webpage'
// @ts-ignore
import pluginForms from 'grapesjs-plugin-forms'
import './App.css'

const TENANT = (window as any).__QNCT_TENANT__ || 'default'
const API_BASE = (window as any).__QNCT_API__ || ''

export default function App() {
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (editorRef.current) return

    const editor = grapesjs.init({
      container: '#gjs',
      height: '100%',
      width: 'auto',
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap',
          'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
        'https://paste.rs/gBXlq',
        ],
      },
      storageManager: TENANT !== 'default' ? {
        type: 'remote',
        stepsBeforeSave: 3,
        options: {
          remote: {
            urlLoad: `${API_BASE}/api/content/${TENANT}/project`,
            urlStore: `${API_BASE}/api/content/${TENANT}/project`,
            fetchOptions: (opts: RequestInit) => opts.body ? { method: 'POST' } : {},
            onStore: (data: unknown) => ({ data }),
            onLoad: (result: any) => result?.data,
          }
        }
      } : { type: 'local' },
      plugins: [blocksBasic, presetsWebpage, pluginForms],
      pluginsOpts: {
        [blocksBasic as any]: {},
        [presetsWebpage as any]: {
          blocksBasicOpts: { flexGrid: true },
        },
        [pluginForms as any]: {},
      },
      layerManager: {
        appendTo: '.gjs-pn-views-container',
      },
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '' },
          { name: 'Tablet', width: '768px', widthMedia: '992px' },
          { name: 'Mobile', width: '375px', widthMedia: '480px' },
        ],
      },
    })

    editor.Commands.add('set-device-desktop', { run: (ed: any) => ed.setDevice('Desktop') })
    editor.Commands.add('set-device-tablet', { run: (ed: any) => ed.setDevice('Tablet') })
    editor.Commands.add('set-device-mobile', { run: (ed: any) => ed.setDevice('Mobile') })

    // Expose editor globally for external content injection
    ;(window as any).__gjsEditor = editor
    editorRef.current = editor
    return () => { editor.destroy(); editorRef.current = null; delete (window as any).__gjsEditor }
  }, [])

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div id="gjs" style={{ height: '100%' }} />
    </div>
  )
}
