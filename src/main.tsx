import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { KanbanProvider } from './context/KanbanContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KanbanProvider>
      <App />
    </KanbanProvider>
  </React.StrictMode>,
)
