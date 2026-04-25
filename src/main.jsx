import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import DashboardPage from './components/DashboardPage'
import BuilderPage from './BuilderPage'
import './styles/liquid-glass.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="/website" element={<BuilderPage type="web" title="Website Builder" />} />
            <Route path="/newsletter" element={<BuilderPage type="email" title="Newsletter Builder" />} />
            <Route path="/docs" element={<BuilderPage type="document" title="Document Builder" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
