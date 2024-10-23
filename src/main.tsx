import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import appStore from "./utils/redux/appStore.ts"
import { Provider } from "react-redux"

createRoot(document.getElementById('root')!).render(
  <Provider store = {appStore}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>,
)
