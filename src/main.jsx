import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Import des différentes "apps" disponibles pour les tests
import App from './App.jsx'
import AppEntreprise from './App_entreprise.jsx'
import AppSchool from './SchoolDashboard.jsx'
import App1 from './App1.jsx'
import AppEmploye from './App_employe.jsx'

// Permet de choisir quelle app monter via le paramètre d'URL `?app=`.
// Exemples:
//  - /?app=app           -> monte `App` (comportement par défaut)
//  - /?app=entreprise    -> monte `App_entreprise.jsx`
//  - /?app=school        -> monte `SchoolDashboard.jsx`
//  - /?app=app1          -> monte `App1.jsx`
const params = new URLSearchParams(window.location.search)
const appParam = (params.get('app') || 'app').toLowerCase()

const mapping = {
  app: App,
  school: AppSchool,
  app1: App1,
  employe: AppEmploye,
}

const ChosenApp = mapping[appParam] || App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChosenApp />
  </StrictMode>,
)
