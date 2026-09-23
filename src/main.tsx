import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Schriften liegen auf unserem eigenen Server statt bei Google Fonts –
// so wird beim Seitenaufruf keine IP-Adresse an Google übertragen.
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import '@fontsource/sora/800.css'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
