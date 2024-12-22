import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import Root from './App.jsx'

createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <main className="dark text-foreground bg-background min-h-screen">
      <Root />
    </main>
  </NextUIProvider>

)
