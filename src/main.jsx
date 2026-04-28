import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StarlinkList from './StarlinkList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StarlinkList />
  </StrictMode>,
)
