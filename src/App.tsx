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
        [presetsWebpage as any]: {},
        [pluginForms as any]: {},
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

    editorRef.current = editor
    return () => { editor.destroy(); editorRef.current = null }
  }, [])

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div id="gjs" style={{ height: '100%' }} />
    </div>
  )
}
